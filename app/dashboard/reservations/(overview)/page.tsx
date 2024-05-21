import Pagination from '@/app/ui/reservations/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/reservations/table';
import { CreateReservation } from '@/app/ui/reservations/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchReservationsPages } from '@/app/lib/data';
import { ReservationTableSkeleton, SearchSkeleton, CreateReservationSkeleton } from '@/app/ui/skeletons';
import ReservationsTable from '@/app/ui/reservations/table';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Reservations',
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

  const totalPages = await fetchReservationsPages(query);
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={lusitana.className + " text-2xl"}>
          Reservation Page <br />
          221711848 <br />
          Jimmy Raymond Wijaya
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Suspense fallback={<SearchSkeleton />}>
        <Search placeholder="Search reservations..." />
        </Suspense>
        <Suspense fallback={<CreateReservationSkeleton />}>
          <CreateReservation />
          </Suspense>
      </div>
      <Suspense fallback={<ReservationTableSkeleton />}>
        <Table key={query + currentPage} query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}