import { sql, QueryResult } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  CustomerForm,
  ProductForm,
} from './definitions';
import { SupplierForm, SupplierField, SuppliersTableType } from './definitions'; // Pastikan definisi ini ada dalam definitions


import { formatCurrency } from './utils';

type Product = {
  product_id: string;
  product_name: string;
  price: number;
  stock_quantity: number;
  category: string;
};

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

export async function fetchProductById(id: string): Promise<ProductForm> {
  try {
    const result: QueryResult<ProductForm> = await sql`
      SELECT
        product_id AS id,
        product_name AS name,
        price,
        stock_quantity,
        category
      FROM products
      WHERE product_id = ${id}
    `;

    if (result.rowCount === 0) {
      throw new Error('Product not found');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchCustomersById(id: string) {
  noStore();
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

export async function fetchProductsPages(query: string): Promise<number> {
  try {
    const result: QueryResult<{ count: number }> = await sql`
      SELECT COUNT(*) as count
      FROM products
      WHERE
        product_name ILIKE ${`%${query}%`} OR
        CAST(price AS TEXT) ILIKE ${`%${query}%`} OR
        CAST(stock_quantity AS TEXT) ILIKE ${`%${query}%`} OR
        category ILIKE ${`%${query}%`}
    `;

    const totalCount = result.rows[0].count;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchFilteredProducts(query: string, currentPage: number): Promise<Product[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  noStore();

  try {
    const data = await sql<Product>`
      SELECT
        product_id,
        product_name,
        price,
        stock_quantity,
        category
      FROM products
      WHERE
        product_name ILIKE ${'%' + query + '%'} OR
        category ILIKE ${'%' + query + '%'} OR
        CAST(price AS TEXT) ILIKE ${'%' + query + '%'} OR
        CAST(stock_quantity AS TEXT) ILIKE ${'%' + query + '%'}
      ORDER BY product_name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}



type Supplier = {
  supplier_id: string;
  supplier_name: string;
  contact_person: string;
  phone_number: string;
  email: string;
};



export async function fetchSuppliersPages(query: string): Promise<number> {
  try {
    const result: QueryResult<{ count: number }> = await sql`
      SELECT COUNT(*) as count
      FROM suppliers
      WHERE
        supplier_name ILIKE ${`%${query}%`} OR
        contact_person ILIKE ${`%${query}%`} OR
        phone_number ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`}
    `;

    const totalCount = result.rows[0].count;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of suppliers.');
  }
}

export async function fetchFilteredSuppliers(query: string, currentPage: number): Promise<Supplier[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  noStore();

  try {
    const data = await sql<Supplier>`
      SELECT
        supplier_id,
        supplier_name,
        contact_person,
        phone_number,
        email
      FROM suppliers
      WHERE
        supplier_name ILIKE ${'%' + query + '%'} OR
        contact_person ILIKE ${'%' + query + '%'} OR
        phone_number ILIKE ${'%' + query + '%'} OR
        email ILIKE ${'%' + query + '%'}
      ORDER BY supplier_name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch suppliers.');
  }
}

export async function fetchSupplierById(id: string): Promise<SupplierForm> {
  try {
    const result: QueryResult<SupplierForm> = await sql`
      SELECT
        supplier_id AS id,
        supplier_name AS name,
        contact_person,
        phone_number,
        email
      FROM suppliers
      WHERE supplier_id = ${id}
    `;

    if (result.rowCount === 0) {
      throw new Error('Supplier not found');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch supplier.');
  }
}

export async function fetchSuppliers() {
  noStore();
  try {
    const data = await sql<SupplierField>`
      SELECT
        supplier_id AS id,
        supplier_name AS name
      FROM suppliers
      ORDER BY supplier_name ASC
    `;

    const suppliers = data.rows;
    return suppliers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all suppliers.');
  }
}


export async function fetchLatestSuppliers() {
  try {
    noStore();
    const data = await sql<SupplierField>`
      SELECT supplier_id, supplier_name, contact_person, phone_number, email
      FROM suppliers
      ORDER BY supplier_id DESC
      LIMIT 5;
    `;

    const latestSuppliers = data.rows.map((supplier) => ({
      ...supplier,
    }));

    return latestSuppliers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest suppliers.');
  }
}