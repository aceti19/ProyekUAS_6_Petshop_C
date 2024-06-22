import Link from 'next/link';
import { CheckIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createSupplier } from '@/app/lib/actions';
import { SupplierField } from '@/app/lib/definitions';

export default function Form({ suppliers }: { suppliers: SupplierField[] }) {
  return (
    <form action={createSupplier}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Supplier Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Supplier Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter supplier name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Contact Person */}
        <div className="mb-4">
          <label htmlFor="contact_person" className="mb-2 block text-sm font-medium">
            Contact Person
          </label>
          <div className="relative">
            <input
              id="contact_person"
              name="contact_person"
              type="text"
              placeholder="Enter contact person"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phone_number" className="mb-2 block text-sm font-medium">
            Phone Number
          </label>
          <div className="relative">
            <input
              id="phone_number"
              name="phone_number"
              type="text"
              placeholder="Enter phone number"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/suppliers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Supplier</Button>
      </div>
    </form>
  );
}
