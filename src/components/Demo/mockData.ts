
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  salary: number;
}
export const users: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    department: 'Engineering',
    joinDate: '2020-01-15',
    salary: 85000
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Developer',
    department: 'Engineering',
    joinDate: '2021-03-22',
    salary: 75000
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Designer',
    department: 'Design',
    joinDate: '2019-11-30',
    salary: 70000
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'Manager',
    department: 'Marketing',
    joinDate: '2018-07-14',
    salary: 90000
  },
  {
    id: 5,
    name: 'Eva Davis',
    email: 'eva@example.com',
    role: 'Analyst',
    department: 'Finance',
    joinDate: '2022-02-18',
    salary: 65000
  }
];

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

export const products: Product[] = [
  {
    id: 'P001',
    name: 'Laptop',
    category: 'Electronics',
    price: 999.99,
    stock: 25,
    rating: 4.5
  },
  {
    id: 'P002',
    name: 'Mouse',
    category: 'Electronics',
    price: 29.99,
    stock: 100,
    rating: 4.2
  }
];

