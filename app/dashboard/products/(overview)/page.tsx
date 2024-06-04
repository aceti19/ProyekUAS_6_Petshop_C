import Pagination from '@/app/ui/products/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/products/table';
import { CreateProduct } from '@/app/ui/products/buttons';
import { kanit } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchProductsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { ProductsTableSkeleton, SearchSkeleton, CreateProductSkeleton, TitleSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
    title: 'Products',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchProductsPages(query);

    return (
        <div className="w-full p-6 bg-gray-100 min-h-screen">
            <Suspense fallback={<TitleSkeleton />}>
                <div className="flex flex-col items-center justify-between bg-white p-6 shadow-md rounded-lg">
                    <h1 className={`${kanit.className} text-3xl mb-4`}>Products</h1>
                    <div className="flex w-full items-center justify-between gap-4">
                        <Suspense fallback={<SearchSkeleton />}>
                            <Search placeholder="Search products..." />
                        </Suspense>
                        <Suspense fallback={<CreateProductSkeleton />}>
                            <CreateProduct />
                        </Suspense>
                    </div>
                </div>
            </Suspense>
            <div className="mt-6 flex flex-col items-center">
                <Suspense fallback={<ProductsTableSkeleton />}>
                    <div className="w-full bg-white p-6 shadow-md rounded-lg">
                        <Table key={query + currentPage} query={query} currentPage={currentPage} />
                    </div>
                </Suspense>
                <div className="mt-6">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </div>
    );
}
