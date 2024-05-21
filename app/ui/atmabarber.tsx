import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { kanit } from '@/app/ui/fonts';

export default function AtmaLogo() {
  return (
    <div
      className={`${kanit.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Atma Barbershop</p>
    </div>
  );
}
