import Form from '@/app/ui/suppliers/create-form';
import Breadcrumbs from '@/app/ui/suppliers/breadcrumbs';
import { fetchSuppliers } from '@/app/lib/data';

export default async function Page() {
  const suppliers = await fetchSuppliers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Suppliers', href: '/dashboard/suppliers' },
          {
            label: 'Create Supplier',
            href: '/dashboard/suppliers/create',
            active: true,
          },
        ]}
      />
      <Form suppliers={suppliers} />
    </main>
  );
}
