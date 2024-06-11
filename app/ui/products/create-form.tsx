"use client";

import Link from 'next/link';
import {
  CheckIcon,
  CurrencyDollarIcon,
  CubeIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createProduct } from '@/app/lib/actions';
import { useState } from 'react';

export default function Form() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <form action={createProduct}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Product Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter product name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Product Price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Stock Quantity */}
        <div className="mb-4">
          <label htmlFor="stock_quantity" className="mb-2 block text-sm font-medium">
            Stock Quantity
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="stock_quantity"
                name="stock_quantity"
                type="number"
                placeholder="Enter stock quantity"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CubeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={toggleDropdown}
              className="w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-left text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Select categories
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                <div className="py-1">
                  <label className="flex items-center px-4 py-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="food"
                      className="form-checkbox"
                    />
                    <span className="ml-2">Food</span>
                  </label>
                  <label className="flex items-center px-4 py-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="toys"
                      className="form-checkbox"
                    />
                    <span className="ml-2">Toys</span>
                  </label>
                  <label className="flex items-center px-4 py-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="bedding"
                      className="form-checkbox"
                    />
                    <span className="ml-2">Bedding</span>
                  </label>
                  <label className="flex items-center px-4 py-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="grooming"
                      className="form-checkbox"
                    />
                    <span className="ml-2">Grooming</span>
                  </label>
                  <label className="flex items-center px-4 py-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="accessories"
                      className="form-checkbox"
                    />
                    <span className="ml-2">Accessories</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Product</Button>
      </div>
    </form>
  );
}
