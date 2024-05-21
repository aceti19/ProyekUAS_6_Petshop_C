import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/reservations/breadcrumbs';
import { fetchCustomersById } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [customers] = await Promise.all([
        fetchCustomersById(id)
    ]);
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Customers', href: '/dashboard/customers' },
                    {
                        label: 'Edit Customer',
                        href: `/dashboard/customers/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form customers={customers}  />
        </main>
    );
}