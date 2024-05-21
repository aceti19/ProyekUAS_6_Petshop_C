import Form from '@/app/ui/reservations/edit-form'; // Make sure the path is correct for the reservations edit form
import Breadcrumbs from '@/app/ui/reservations/breadcrumbs'; // Adjust the path if necessary
import { fetchReservationById, fetchCustomers } from '@/app/lib/data'; // Make sure fetchReservationById exists
import { notFound } from 'next/navigation';


export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [reservation, customers] = await Promise.all([
      fetchReservationById(id), // Make sure this function is implemented to fetch reservation by ID
      fetchCustomers(),
  ]);
  if (!reservation) {
    notFound();
  }
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Reservations', href: '/dashboard/reservations' }, // Update the label and href
          {
            label: 'Edit Reservation', // Update the label
            href: `/dashboard/reservations/${id}/edit`, // Update the href
            active: true,
          },
        ]}
      />
      <Form reservation={reservation} customers={customers} /> {/* Update the prop from invoice to reservation */}
    </main>
  );
}
