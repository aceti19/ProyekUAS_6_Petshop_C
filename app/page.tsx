// import AcmeLogo from '@/app/ui/acme-logo';
// import { ArrowRightIcon } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import styles from '@/app/ui/home.module.css';
// import { lusitana } from '@/app/ui/fonts';
// import Image from 'next/image';

import { ArrowRightCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { kanit, anton } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className="relative min-h-screen flex flex-col" style={{ background: 'linear-gradient(to bottom right, #FFB0C0, #93B9E7)' }}>
      <Image
        src="/ab.png"
        layout="fill"
        objectFit="cover"
        className="absolute z-0 opacity-20"
        alt="Background image"
      />

      <header className="relative z-10 flex items-center justify-between p-6 bg-white bg-opacity-30 backdrop-blur-md rounded-b-3xl shadow-lg border-b-2 border-white">
        <div className="flex items-center space-x-4">
          <Image src="/logo_b.png" width={60} height={60} alt="Logo" className="rounded-full" />
          <div className="text-2xl font-bold text-[#FF6F91]">
            Pet Palooza
          </div>
        </div>
        <nav className="flex space-x-4">
          <Link href="/login" passHref>
            <div className="flex items-center gap-2 p-2 bg-[#FF6F91] bg-opacity-80 backdrop-blur-md rounded-full shadow-lg cursor-pointer text-white hover:bg-opacity-100 transition-all transform hover:scale-105">
              <UserIcon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="hidden md:inline">Log in</span>
            </div>
          </Link>
        </nav>
      </header>

      <section className="relative flex flex-col items-center justify-center flex-grow text-center text-white p-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-3xl shadow-xl max-w-2xl border-2 border-white">
          <h1 className={`${kanit.className} text-3xl md:text-5xl font-bold text-[#FF6F91]`}>
            Paws & Whiskers Petshop
          </h1>
          <h2 className={`text-[#FF6F91] font-extrabold text-4xl md:text-6xl ${anton.className} mt-4`}>
            Welcome to Our PetShop
          </h2>
          <h3 className={`text-[#FF6F91] font-extrabold text-3xl md:text-5xl ${anton.className} mt-4`}>
            PET PALOOZA
          </h3>
          <Link href="/dashboard" passHref>
            <div className="mt-10 inline-flex items-center gap-2 p-4 bg-[#FF6F91] text-white font-bold rounded-full cursor-pointer shadow-lg hover:bg-[#FF8BA3] transition-all transform hover:scale-105">
              <span>Dashboard</span>
              <ArrowRightCircleIcon className="w-6 h-6" />
            </div>
          </Link>
        </div>
      </section>

      <footer className="relative z-10 flex justify-center p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-t-3xl shadow-lg border-t-2 border-white">
        <div className="text-[#FF6F91]">© 2023 Pet Palooza. All rights reserved.</div>
      </footer>
    </main>
  );
}
