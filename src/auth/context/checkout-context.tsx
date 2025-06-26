'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface CheckoutContextType {
  shipping: ShippingInfo;
  setShipping: (s: ShippingInfo) => void;
  payment: PaymentInfo;
  setPayment: (p: PaymentInfo) => void;
  cart: any;
  setCart: (c: any) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [shipping, setShipping] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [payment, setPayment] = useState<PaymentInfo>({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [cart, setCart] = useState<any>({
    items: [],
    total: 0,
  });

  return (
    <CheckoutContext.Provider value={{ shipping, setShipping, payment, setPayment, cart, setCart }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckoutContext must be used within a CheckoutProvider');
  return ctx;
};
