import { UpdateSupplier, DeleteSupplier } from '@/app/ui/suppliers/buttons';
import { fetchFilteredSuppliers } from '@/app/lib/data';

export default async function SuppliersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const suppliers = await fetchFilteredSuppliers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gradient-to-r from-[#FFB0C0] to-[#93B9E7] shadow-md p-4">
          <div className="md:hidden">
            {suppliers?.map((supplier) => (
              <div
                key={supplier.supplier_id}
                className="mb-2 w-full rounded-md bg-gradient-to-r from-[#FFC1CC] to-[#A7C7E7] p-4 shadow-lg transition-transform transform hover:scale-105 hover:from-[#FFB0C0] hover:to-[#93B9E7] animate-popIn"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{supplier.supplier_name}</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      Contact Person: {supplier.contact_person}
                    </p>
                  </div>
                  <p className="text-xl font-medium">
                    {supplier.phone_number}
                  </p>
                  <div className="flex justify-end gap-2">
                    <UpdateSupplier id={supplier.supplier_id} />
                    <DeleteSupplier id={supplier.supplier_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg bg-gradient-to-r from-[#FFC1CC] to-[#A7C7E7] text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Supplier
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Contact Person
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="relative px-3 py-5">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {suppliers?.map((supplier) => (
                <tr
                  key={supplier.supplier_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg transition-transform transform hover:bg-[#FFE4E1] hover:scale-105 animate-popIn"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{supplier.supplier_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {supplier.contact_person}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {supplier.phone_number}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {supplier.email}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSupplier id={supplier.supplier_id} />
                      <DeleteSupplier id={supplier.supplier_id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}