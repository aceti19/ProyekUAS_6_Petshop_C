'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/app/auth';
import { AuthError } from 'next-auth';

const CustomerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image_url: z.string(),
});

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  stock_quantity: z.coerce.number(),
  category: z.string(),
});

const SupplierSchema = z.object({
  id: z.string(),
  name: z.string(),
  contact_person: z.string(),
  phone_number: z.string(),
  email: z.string(),
});

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});


const CreateCustomer = CustomerSchema.omit({ id: true });
const UpdateCustomer = CustomerSchema.omit({ id: true });
const CreateProduct = ProductSchema.omit({ id: true });
const UpdateProduct = ProductSchema.omit({ id: true });
const CreateSupplier = SupplierSchema.omit({ id: true });
const UpdateSupplier = SupplierSchema.omit({ id: true });

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
 
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
     return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

  const UpdateInvoice = FormSchema.omit({ id: true, date: true });

  export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    try {
      await sql`
          UPDATE invoices
          SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
          WHERE id = ${id}
        `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Invoice.' };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function deleteInvoice(id: string) {
    // throw new Error('Failed to Delete Invoice');
      await sql`DELETE FROM invoices WHERE id = ${id}`;
      revalidatePath('/dashboard/invoices');
    }
  

export async function createCustomer(formData: FormData) {
  const img = formData.get('image');
  let fileName = '';
  if (img instanceof File) {
    fileName = '/customers/' + img.name;
  }

  const { name, email, image_url } = CreateCustomer.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: fileName,
  });

  await sql`
    INSERT INTO customers (name, email, image_url)
    VALUES (${name}, ${email}, ${image_url})
  `;

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function updateCustomer(id: string, formData: FormData) {
  const img = formData.get('image');
  let fileName = '';
  if (img instanceof File) {
    fileName = '/customers/' + img.name;
  }

  const { name, email, image_url } = UpdateCustomer.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: fileName,
  });

  await sql`
    UPDATE customers
    SET name = ${name}, email = ${email}, image_url = ${image_url}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  await sql`DELETE FROM customers WHERE id = ${id}`;
  revalidatePath('/dashboard/customers');
}

export async function createProduct(formData: FormData) {
  const { name, price, stock_quantity, category } = CreateProduct.parse({
    name: formData.get('name'),
    price: formData.get('price'),
    stock_quantity: formData.get('stock_quantity'),
    category: formData.get('category'),
  });

  await sql`
    INSERT INTO products (product_name, price, stock_quantity, category)
    VALUES (${name}, ${price}, ${stock_quantity}, ${category})
  `;

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function updateProduct(id: string, formData: FormData) {
  const { name, price, stock_quantity, category } = UpdateProduct.parse({
    name: formData.get('name'),
    price: formData.get('price'),
    stock_quantity: formData.get('stock_quantity'),
    category: formData.get('category'),
  });

  await sql`
    UPDATE products
    SET product_name = ${name}, price = ${price}, stock_quantity = ${stock_quantity}, category = ${category}
    WHERE product_id = ${id}
  `;

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function deleteProduct(id: string) {
  await sql`DELETE FROM products WHERE product_id = ${id}`;
  revalidatePath('/dashboard/products');
}

export async function createSupplier(formData: FormData) {
  const { name, contact_person, phone_number, email } = CreateSupplier.parse({
    name: formData.get('name'),
    contact_person: formData.get('contact_person'),
    phone_number: formData.get('phone_number'),
    email: formData.get('email'),
  });

  await sql`
    INSERT INTO suppliers (supplier_name, contact_person, phone_number, email)
    VALUES (${name}, ${contact_person}, ${phone_number}, ${email})
  `;

  revalidatePath('/dashboard/suppliers');
  redirect('/dashboard/suppliers');
}

export async function updateSupplier(id: string, formData: FormData) {
  const { name, contact_person, phone_number, email } = UpdateSupplier.parse({
    name: formData.get('name'),
    contact_person: formData.get('contact_person'),
    phone_number: formData.get('phone_number'),
    email: formData.get('email'),
  });

  await sql`
    UPDATE suppliers
    SET supplier_name = ${name}, contact_person = ${contact_person}, phone_number = ${phone_number}, email = ${email}
    WHERE supplier_id = ${id}
  `;

  revalidatePath('/dashboard/suppliers');
  redirect('/dashboard/suppliers');
}

export async function deleteSupplier(id: string) {
  await sql`DELETE FROM suppliers WHERE supplier_id = ${id}`;
  revalidatePath('/dashboard/suppliers');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
