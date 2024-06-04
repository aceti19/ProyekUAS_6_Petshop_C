import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { LatestSuppliers } from '@/app/lib/definitions'; // Adjust this import according to your actual data structure

export default function LatestSuppliersComponent({
  latestSuppliers,
}: {
  latestSuppliers: LatestSuppliers[]; // Ensure this type matches your supplier data structure
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Suppliers
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestSuppliers.map((supplier, i) => {
            return (
              <div
                key={supplier.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex flex-col min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {supplier.supplier_name}
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
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
