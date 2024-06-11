import { UpdateProduct, DeleteProduct } from '@/app/ui/products/buttons'; // Pastikan Anda memiliki komponen tombol ini
import { formatCurrency } from '@/app/lib/utils';
import { fetchFilteredProducts } from '@/app/lib/data';

export default async function ProductsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg bg-gradient-to-r from-[#FFB0C0] to-[#93B9E7] p-4 shadow-md">
              <div className="md:hidden">
                {products?.map((product) => (
                  <div
                    key={product.product_id}
                    className="mb-2 w-full rounded-md bg-gradient-to-r from-[#FFC1CC] to-[#A7C7E7] p-4 shadow-lg transition-transform transform hover:scale-105 hover:from-[#FFB0C0] hover:to-[#93B9E7]"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <p>{product.product_name}</p>
                        </div>
                        <p className="text-sm text-gray-700">
                          Stock: {product.stock_quantity}
                        </p>
                      </div>
                      <p className="text-xl font-medium">
                        {formatCurrency(Number(product.price))}
                      </p>
                      <div className="flex justify-end gap-2">
                        <UpdateProduct id={product.product_id} />
                        <DeleteProduct id={product.product_id} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg bg-gradient-to-r from-[#FFC1CC] to-[#A7C7E7] text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Product
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Price
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Stock
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Category
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {products?.map((product) => (
                    <tr
                      key={product.product_id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg transition-transform transform hover:bg-[#FFE4E1] hover:scale-105"
                    >
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{product.product_name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {formatCurrency(Number(product.price))}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {product.stock_quantity}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {product.category}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateProduct id={product.product_id} />
                          <DeleteProduct id={product.product_id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}