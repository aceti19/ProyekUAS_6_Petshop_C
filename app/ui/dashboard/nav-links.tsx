import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ArchiveBoxIcon, // Assuming you use this icon for Products
  TruckIcon // Assuming you use this icon for Suppliers
} from '@heroicons/react/24/outline';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Products', href: '/dashboard/products', icon: ArchiveBoxIcon },
  { name: 'Suppliers', href: '/dashboard/suppliers', icon: TruckIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-black-500 p-3 text-sm font-medium hover:bg-pink-600 text-white md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}
