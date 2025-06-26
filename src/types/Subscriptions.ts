interface Customer {
  id: string;
  zipCode: string;
  state: string;
  city: string;
  role: string;
  email: string;
  address: string;
  name: string;
  isVerified: boolean;
  company: string;
  country: string;
  avatarUrl: string;
  phoneNumber: string;
  status: string;
}

export interface ISubscription {
  user: any;
  customer: Customer;
  date: string; // ISO string format
  status: string;
  id: string;
  price: string;
  category: number;
  history: any[];
}
