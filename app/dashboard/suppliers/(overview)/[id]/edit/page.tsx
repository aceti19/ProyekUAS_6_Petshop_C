import Form from '@/app/ui/suppliers/edit-form'; // Pastikan path benar untuk form edit supplier
import Breadcrumbs from '@/app/ui/suppliers/breadcrumbs'; // Sesuaikan path jika diperlukan
import { fetchSupplierById } from '@/app/lib/data'; // Pastikan fetchSupplierById ada
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const supplier = await fetchSupplierById(id); // Pastikan fungsi ini diimplementasikan untuk mengambil supplier berdasarkan ID
  
  if (!supplier) {
    return notFound(); // Panggil fungsi notFound jika supplier tidak ditemukan
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Suppliers', href: '/dashboard/suppliers' }, // Perbarui label dan href
          {
            label: 'Edit Supplier', // Perbarui label
            href: `/dashboard/suppliers/${id}/edit`, // Perbarui href
            active: true,
          },
        ]}
      />
      <Form supplier={supplier} /> {/* Pastikan Form menerima supplier */}
    </main>
  );
}
