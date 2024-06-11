import Form from '@/app/ui/products/edit-form'; // Pastikan path benar untuk form edit produk
import Breadcrumbs from '@/app/ui/products/breadcrumbs'; // Sesuaikan path jika diperlukan
import { fetchProductById } from '@/app/lib/data'; // Pastikan fetchProductById ada
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = await fetchProductById(id); // Pastikan fungsi ini diimplementasikan untuk mengambil produk berdasarkan ID
  
  if (!product) {
    return notFound(); // Panggil fungsi notFound jika produk tidak ditemukan
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' }, // Perbarui label dan href
          {
            label: 'Edit Product', // Perbarui label
            href: `/dashboard/products/${id}/edit`, // Perbarui href
            active: true,
          },
        ]}
      />
      <Form product={product} /> {/* Perbarui prop dari reservation ke product */}
    </main>
  );
}
