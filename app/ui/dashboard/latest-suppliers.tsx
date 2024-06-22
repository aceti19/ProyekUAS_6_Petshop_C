import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { LatestSupplier } from '@/app/lib/definitions'; // Adjust this import according to your actual data structure

export default function LatestSuppliersComponent({
  latestSuppliers,
}: {
  latestSuppliers: LatestSupplier[]; // Ensure this type matches your supplier data structure
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Suppliers
      </h2>
      <div className="flex grow justify-between rounded-xl bg-gradient-to-r from-[#FFC1CC] to-[#A7C7E7] p-4 overflow-x-auto">
        {latestSuppliers.map((supplier, i) => (
          <div
            key={supplier.id}
            className={clsx(
              'flex flex-col items-start justify-between p-4 bg-white m-2 rounded-lg shadow-md w-64 transition-transform transform hover:scale-105 hover:bg-[#FFB0C0]',
              {
                'border-t': i !== 0,
              },
            )}
          >
            <p className="truncate text-sm font-semibold md:text-base text-[#FFB0C0]">
              {supplier.name}
            </p>
            <p className="truncate text-sm text-gray-500 md:text-base">
              {supplier.contact_person}
            </p>
            <p className="truncate text-sm text-gray-500 md:text-base">
              {supplier.phone_number}
            </p>
            <p className="hidden text-sm text-gray-500 sm:block">
              {supplier.email}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center pb-2 pt-6">
        <ArrowPathIcon className="h-5 w-5 text-gray-500" />
        <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
      </div>
    </div>
  );
}
