import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';

import {
  ReservationsTable,
  LatestReservationsRaw,
  ReservationForm,
  CustomerForm,
} from './definitions';

import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    noStore();
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Add noStore() here to prevent the response from being cached
    const data = await sql<Revenue>`SELECT * FROM revenue`;
    console.log('Data fetch completed after 3 seconds.');
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
 

export async function fetchLatestInvoices() {
  try {
    noStore();
    const data = await sql<LatestInvoiceRaw>`
      SELECT DISTINCT ON (invoices.id) invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.id, invoices.date DESC
      LIMIT 5;
    `; // Ensure the SQL query is enclosed in backticks

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchLatestReservations() {
  try {
    const data = await sql<LatestReservationsRaw>`
      SELECT reservations.amount, customers.name, customers.image_url, customers.email, reservations.id
      FROM reservations
      JOIN customers ON reservations.customer_id = customers.id
      ORDER BY reservations.date DESC
      LIMIT 1`;

    const latestReservations = data.rows.map((reservation) => ({
      ...reservation,
      amount: formatCurrency(reservation.amount),
    }));
    return latestReservations;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest reservations.');
  }
}

export async function fetchCardData() {
  try {
    noStore();
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  noStore();

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${'%' + query + '%'} OR
        customers.email ILIKE ${'%' + query + '%'} OR
        invoices.amount::text ILIKE ${'%' + query + '%'} OR
        invoices.date::text ILIKE ${'%' + query + '%'} OR
        invoices.status ILIKE ${'%' + query + '%'}
      ORDER BY invoices.date DESC
      LIMIT 5
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredReservations(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const reservations = await sql<ReservationsTable>`
      SELECT
        reservations.id,
        reservations.amount,
        reservations.date,
        reservations.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM reservations
      JOIN customers ON reservations.customer_id = customers.id
      WHERE
        customers.name ILIKE ${'%' + query + '%'} OR
        customers.email ILIKE ${'%' + query + '%'} OR
        reservations.amount::text ILIKE ${'%' + query + '%'} OR
        reservations.date::text ILIKE ${'%' + query + '%'} OR
        reservations.status ILIKE ${'%' + query + '%'}
      ORDER BY reservations.date DESC
      LIMIT 5
    `;

    return reservations.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reservations.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${'%' + query + '%'} OR
      customers.email ILIKE ${'%' + query + '%'} OR
      invoices.amount::text ILIKE ${'%' + query + '%'} OR
      invoices.date::text ILIKE ${'%' + query + '%'} OR
      invoices.status ILIKE ${'%' + query + '%'}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchReservationsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM reservations
    JOIN customers ON reservations.customer_id = customers.id
    WHERE
      customers.name ILIKE ${'%' + query + '%'} OR
      customers.email ILIKE ${'%' + query + '%'} OR
      reservations.amount::text ILIKE ${'%' + query + '%'} OR
      reservations.date::text ILIKE ${'%' + query + '%'} OR
      reservations.status ILIKE ${'%' + query + '%'}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of reservations.');
  }
}

const ITEMS_PER_PAGESS = 11;
export async function fetchCustomersPages(query: string) {
  try {
    const count = await sql`
    SELECT COUNT(*)
    FROM customers
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      customers.image_url ILIKE ${`%${query}%`} 
     
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGESS);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}


export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGESS;
  try {
    const data = await sql<CustomersTableType>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC
      LIMIT ${ITEMS_PER_PAGESS} OFFSET ${offset}
    `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer table.');
  }
}
export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchReservationById(id: string) {
  noStore();
  try {
    const data = await sql<ReservationForm>`
      SELECT
        reservations.id,
        reservations.customer_id,
        reservations.amount,
        reservations.status,
        reservations.date
      FROM reservations
      WHERE reservations.id = ${id};
    `;

    const reservation = data.rows.map((reservation) => ({
      ...reservation,
      // Convert amount from cents to dollars
      amount: reservation.amount / 100,
    }));
    
    return reservation[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomersById(id: string) {
  noStore()
  try {
    const data = await sql<CustomerForm>`
      SELECT
        id,
        name,
        email,
        image_url
      FROM customers
      WHERE customers.id = ${id};
    `;

    const customers = data.rows.map((customers) => ({
      ...customers,
      amount: customers.amount / 100,
    }));

    return customers[0];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}