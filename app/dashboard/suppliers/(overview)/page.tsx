import Pagination from '@/app/ui/suppliers/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/suppliers/table';
import { CreateSupplier } from '@/app/ui/suppliers/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchSuppliersPages } from '@/app/lib/data';
import { SuppliersTableSkeleton, SearchSkeleton, CreateSupplierSkeleton } from '@/app/ui/skeletons';
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
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      <Suspense fallback={<div className="flex w-full items-center justify-between bg-white p-6 shadow-md rounded-lg"><div className={`${lusitana.className} text-3xl mb-4`}>Loading...</div></div>}>
        <div className="flex flex-col items-center justify-between bg-white p-6 shadow-md rounded-lg">
          <h1 className={`${lusitana.className} text-3xl mb-4`}>Suppliers</h1>
          <div className="flex w-full items-center justify-between gap-4">
            <Suspense fallback={<SearchSkeleton />}>
              <Search placeholder="Search suppliers..." />
            </Suspense>
            <Suspense fallback={<CreateSupplierSkeleton />}>
              <CreateSupplier />
            </Suspense>
          </div>
        </div>
      </Suspense>
      <div className="mt-6 flex flex-col items-center">
        <Suspense fallback={<SuppliersTableSkeleton />}>
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
