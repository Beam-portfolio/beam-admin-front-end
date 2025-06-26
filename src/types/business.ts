export interface IBusinessType {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  value?: string;
  label?: string;
}

interface IBusinessOwner {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IBusiness {
  id: string;
  name: string;
  address: string;
  contactEmail: string;
  contactNumber: string;
  type: IBusinessType;
  owner: IBusinessOwner;
  createdAt: string;
  updatedAt: string;
}
