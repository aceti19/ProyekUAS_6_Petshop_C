import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { kanit } from '@/app/ui/fonts';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-4 py-6 md:px-2" style={{ background: 'linear-gradient(to bottom right, #FFB0C0, #93B9E7)' }}>
      <Link
        className="mb-4 flex items-center justify-start rounded-lg bg-gradient-to-r from-[#FFB0C0] to-[#93B9E7] p-4 shadow-lg"
        href="/"
        legacyBehavior
      >
        <a className="flex items-center">
          <Image src="/logo_b.png" width={50} height={50} alt="Logo" className="mr-3 rounded-full" />
          <div className={`${kanit.className} text-2xl font-bold text-white`}>
            PetPalooza
          </div>
        </a>
      </Link>
      <div className="flex grow flex-col justify-start space-y-1">
        <NavLinks />
      </div>
      <div className="mt-auto">
        <Link href="/" legacyBehavior>
          <a className="flex items-center justify-center gap-2 rounded-md bg-black bg-opacity-20 p-3 text-sm font-medium text-white shadow-lg hover:bg-opacity-40 transition-all md:justify-start">
            <ArrowUturnLeftIcon className="w-6" />
            <span className="hidden md:inline">Back</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
