const { v4: uuidv4 } = require('uuid');

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Jimmy Raymond Wijaya',
    email: '221711848@students.uajy.ac.id',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Jimmy Raymond Wijaya',
    email: '221711848@students.uajy.ac.id',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
];

const reservations = [
  {
    customer_id: customers[0].id,
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    amount: 15795,
    status: 'paid',
    email: '221711848@students.uajy.ac.id',
    date: '2022-12-06',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const products = [
  {
    product_id: uuidv4(),
    product_name: 'Dog Food - Premium Brand',
    price: 50.00,
    stock_quantity: 100,
    category: 'Food'
  },
  {
    product_id: uuidv4(),
    product_name: 'Cat Food - Premium Brand',
    price: 45.00,
    stock_quantity: 120,
    category: 'Food'
  },
  {
    product_id: uuidv4(),
    product_name: 'Dog Toy - Chew Toy',
    price: 15.00,
    stock_quantity: 200,
    category: 'Toys'
  },
  {
    product_id: uuidv4(),
    product_name: 'Cat Toy - Feather Wand',
    price: 10.00,
    stock_quantity: 150,
    category: 'Toys'
  },
  {
    product_id: uuidv4(),
    product_name: 'Dog Leash - Large',
    price: 25.00,
    stock_quantity: 80,
    category: 'Accessories'
  },
  {
    product_id: uuidv4(),
    product_name: 'Cat Collar - Small',
    price: 12.00,
    stock_quantity: 90,
    category: 'Accessories'
  },
  {
    product_id: uuidv4(),
    product_name: 'Dog Bed - Medium Size',
    price: 60.00,
    stock_quantity: 50,
    category: 'Bedding'
  },
  {
    product_id: uuidv4(),
    product_name: 'Cat Bed - Small Size',
    price: 55.00,
    stock_quantity: 70,
    category: 'Bedding'
  },
  {
    product_id: uuidv4(),
    product_name: 'Dog Shampoo - Sensitive Skin',
    price: 20.00,
    stock_quantity: 110,
    category: 'Grooming'
  },
  {
    product_id: uuidv4(),
    product_name: 'Cat Shampoo - All Natural',
    price: 18.00,
    stock_quantity: 130,
    category: 'Grooming'
  },
  {
    product_id: uuidv4(),
    product_name: 'Dog Food - Regular Brand',
    price: 30.00,
    stock_quantity: 100,
    category: 'Food'
  },
  {
    product_id: uuidv4(),
    product_name: 'Cat Food - Regular Brand',
    price: 25.00,
    stock_quantity: 120,
    category: 'Food'
  },
  {
    product_id: uuidv4(),
    product_name: 'Dog Toy - Rope Toy',
    price: 20.00,
    stock_quantity: 200,
    category: 'Toys'
  },
  {
    product_id: uuidv4(),
    product_name: 'Cat Toy - Ball Toy',
    price: 8.00,
    stock_quantity: 150,
    category: 'Toys'
  },
  {
    product_id: uuidv4(),
    product_name: 'Dog Treats - Training Snacks',
    price: 10.00,
    stock_quantity: 300,
    category: 'Food'
  }
];

const suppliers = [
  {
    supplier_id: uuidv4(),
    supplier_name: 'PetFood Co.',
    contact_person: 'John Doe',
    phone_number: '123-456-7890',
    email: 'contact@petfoodco.com'
  },
  {
    supplier_id: uuidv4(),
    supplier_name: 'PetToys Inc.',
    contact_person: 'Jane Smith',
    phone_number: '098-765-4321',
    email: 'info@pettoysinc.com'
  },
  {
    supplier_id: uuidv4(),
    supplier_name: 'PetAccessories Ltd.',
    contact_person: 'Mike Johnson',
    phone_number: '456-789-0123',
    email: 'support@petaccessories.com'
  },
  {
    supplier_id: uuidv4(),
    supplier_name: 'PetBedding Corp.',
    contact_person: 'Lisa Brown',
    phone_number: '789-012-3456',
    email: 'sales@petbedding.com'
  },
  {
    supplier_id: uuidv4(),
    supplier_name: 'PetGrooming Supplies',
    contact_person: 'Chris Green',
    phone_number: '321-654-0987',
    email: 'orders@petgroomingsupplies.com'
  }
];

module.exports = {
  users,
  customers,
  invoices,
  reservations,
  revenue,
  products,
  suppliers
};
