// ----------------------------------------------------------------------

export type IOrderTableFilterValue = string | Date | null;

export type IOrderTableFilters = {
  name: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type IOrderHistory = {
  orderTime: Date;
  paymentTime: Date;
  deliveryTime: Date;
  completionTime: Date;
  timeline: {
    title: string;
    time: Date;
  }[];
};

export type IOrderShippingAddress = {
  fullAddress: string;
  phoneNumber: string;
};

export type IOrderPayment = {
  cardType: string;
  cardNumber: string;
};

export type IOrderDelivery = {
  shipBy: string;
  speedy: string;
  trackingNumber: string;
};

export type IOrderCustomer = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  ipAddress: string;
};

export type IOrderProductItem = {
  id: string;
  sku: string;
  name: string;
  price: number;
  coverUrl: string;
  quantity: number;
};

export interface IOrder {
  id: number;
  orderNumber: string;
  orderStatus: string;
  orderDate: string; // ISO date string (e.g. "2025-05-13")
  cartId: number;
  paymentInfo: string;
  country: string;
  city: string;
  streetAddress: string;
  userId: number;
  phoneNumber: string;
  email: string;
  createdAt: string; // ISO timestamp string
  updatedAt: string; // ISO timestamp string

  // Optional embedded relations (only if you fetch with joins)
  user: {
    lastName: string;
    photo: string | undefined;
    firstName: string | undefined;
    id: number;
    // extend as needed
    name?: string;
    email?: string;
  };

  cart: {
    total(total: any): import('react').ReactNode;
    id: number;
    // extend as needed
    totalAmount?: number;
    items?: any[]; // refine if needed
  };
}
