// import AcmeLogo from '@/app/ui/acme-logo';
// import { ArrowRightIcon } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import styles from '@/app/ui/home.module.css';
// import { lusitana } from '@/app/ui/fonts';
// import Image from 'next/image';
//fiefueifiefiefienofe

import { ArrowRightCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { kanit, anton } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className='relative min-h-screen flex-col p-6'>
      
      <Image
        src="/bg_hero.png"
        layout='fill'
        objectFit='cover'
        className='absolute z-0'
        alt="Screenshots of the dashboard project showing desktop version"
      />

      
      <div className="absolute top-6 left-6 z-10 flex items-center">
        <div>
          <Image src="/logo_hero.png" width={40} height={40} alt="Logo" />
        </div>
        <div className="ml-5 text-white text-xl font-kanit">
          Atma Barbershop
        </div>
      </div>

      <nav className='fixed top-6 right-6'>
        <div className='flex items-start justify-end'>
          <p>
            <Link
              href="/login"
              className="flex items-end gap-5 self-start rounded-lg bg-blue-500 bg-opacity-0 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-opacity-20 md:text-base border border-white shadow-none"
            >
              <span className="hidden md:flex">Log in</span>
              <UserIcon className="w-5 md:w-6 md:hidden" />
            </Link>
          </p>
        </div>
      </nav>

      <div className='absolute bottom-14 left-6 md:bottom-48 md:left-40'>
        <div className=' mt-4 flex-grow flex-col gap-4 md:flex-row'>
          <p className={`${kanit.className} text-lg text-white md:text-2xl md:leading-normal mb-10`}>
            <strong className={`${kanit.className} text-lg text-white md:text-2xl md:leading-normal mt-10 mb-10`}>221711848 - Jimmy Raymond Wijaya</strong> {' '}
            <a href="" className={`text-white font-bold text-8xl ${anton.className} mt-10 mb-10`}>
              <br></br><strong className={`text-white font-bold text-8xl ${anton.className} mb-10`}>Our Barbershop</strong>
            </a>
            <br></br><strong className={`text-white font-bold text-8xl ${anton.className} mb-10`}>Admin Dashboard</strong>
            <a
            href= "/dashboard">
            <h1
              className={`${kanit.className} antialiased flex text-whitetext-[20px] hover:text-teal-500`}>
              Go to Dashboard
            <ArrowRightCircleIcon className='w-6 mx-2'/>
            </h1>
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}