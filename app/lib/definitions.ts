// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};


export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomerForm = {
  amount: number;
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Product = {
  product_id: string; // Changed from number to string
  product_name: string;
  price: number; // Stored in currency format (e.g., 50.00)
  stock_quantity: number;
  category: string;
};


export type supplierTable = {
  supplier_id: string;
  supplier_name: string;
  contact_person: string;
  phone_number: string;
  email: string;
};

export type productTable = {
  product_id: string;
  product_name: string;
  price: number; // Stored in currency format (e.g., 50.00)
  stock_quantity: number;
  category: string;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type ProductForm = {
  id: string;
  name: string;
  price: number;
  stock_quantity: number;
  category: string;
};

export type ProductsTable = {
  id: string;
  name: string;
  price: number;
  stock_quantity: number;
  category: string;
 
};


export type SuppliersTable = {
  id: string;
  name: string;
  contact_person: string;
  phone_number: string;
  email: string;
};

// New types for latest suppliers
export type LatestSupplier = {
  id: string;
  name: string;
  contact_person: string;
  phone_number: string;
  email: string;
};

export type LatestSupplierRaw = Omit<LatestSupplier, 'id'> & {
  id: string;
};

export type Supplier = {
  supplier_id: string;
  supplier_name: string;
  contact_person: string;
  phone_number: string;
  email: string;
};

export type SupplierForm = {
  id: string;
  name: string;
  contact_person: string;
  phone_number: string;
  email: string;
};

export type SupplierField = {
  id: string;
  name: string;
};

export type SuppliersTableType = Supplier[];