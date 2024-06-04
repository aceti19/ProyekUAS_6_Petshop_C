import Form from '@/app/ui/products/edit-form';
import Breadcrumbs from '@/app/ui/products/breadcrumbs';
import { fetchProductById } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [product] = await Promise.all([
        fetchProductById(id)
    ]);
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Products', href: '/dashboard/products' },
                    {
                        label: 'Edit Product',
                        href: `/dashboard/products/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form product={product} />
        </main>
    );
}
