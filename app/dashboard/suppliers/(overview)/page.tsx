import Pagination from '@/app/ui/suppliers/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/suppliers/table';
import { CreateSupplier } from '@/app/ui/suppliers/buttons';
import { kanit } from '@/app/ui/fonts';
import { CreateSupplierSkeleton, SuppliersTableSkeleton, SearchSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchSuppliersPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Suppliers',
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

    const totalPages = await fetchSuppliersPages(query);
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${kanit.className} text-2xl`}>Suppliers</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Suspense fallback={<SearchSkeleton />}>
                    <Search placeholder="Search suppliers..." />
                </Suspense>
                <Suspense fallback={<CreateSupplierSkeleton />}>
                    <CreateSupplier  />
                </Suspense>
            </div>

            <Suspense
                key={query + currentPage}
                fallback={<SuppliersTableSkeleton />}
            >
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages}  />
            </div>
        </div>
    );
}
