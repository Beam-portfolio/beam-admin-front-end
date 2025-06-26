// ----------------------------------------------------------------------

import { AnyARecord } from 'node:dns';

export type IProductFilterValue = string | string[] | number | number[];

export type IProductFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};

// ----------------------------------------------------------------------

export type IProductReviewNewForm = {
  rating: number | null;
  review: string;
  name: string;
  email: string;
};

export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  isPurchased: boolean;
  attachments?: string[];
  postedAt: Date;
  content: string;
  user: any;
  product: any;
  commentReplies: any[];
};

export type IProductItem = {
  id: string;
  sku: string;
  name: string;
  code: string;
  price: number;
  taxes: number;
  tags: string[];
  gender: string;
  sizes: string[];
  publish: string;
  coverUrl: string;
  images: string[];
  colors: string[];
  quantity: number;
  category: string;
  available: number;
  totalSold: number;
  description: string;
  totalRatings: number;
  totalReviews: number;
  inventoryType: string;
  subDescription: string;
  priceSale: number | null;
  reviews: IProductReview[];
  createdAt: Date;
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  newLabel: {
    enabled: boolean;
    content: string;
  };
};

export type IProductTableFilterValue = string | string[];

export type IProductTableFilters = {
  name: string;
  stock: string[];
  publish: string[];
};

// IProductCategory
export interface IProductCategory {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// CreateProductDto,
export interface CreateProductDto {
  title: string;
  hours?: number;
  credits?: number;
  vendor: string;
  availability?: any;
  images?: string[];
  publish?: boolean;
  description: string;
  categoryId?: number;
  isFuture?: boolean;
  date?: string;
  class?: boolean;
  ratings?: any[];
}
// UpdateProductDto,
export interface UpdateProductDto {
  title?: string;
  hours?: number;
  credits?: number;
  vendor?: string;
  availability?: any;
  images?: string[];
  publish?: boolean;
  description?: string;
  categoryId?: number;
  isFuture?: boolean;
  date?: string;
  class?: boolean;
  ratings?: AnyARecord[];
}
// CreateCategoryDto,
export interface CreateCategoryDto {
  name: string;
  description?: string;
}
// UpdateCategoryDto,

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
}
// CreateRatingDto,
// ListingInterface

export interface CreateRatingDto {
  name: string;
  starCount: number;
  reviewCount: number;
}

export interface ProductInterface {
  id: number;
  productName: string;
  productImage: string;
  productStatus: string;
  standardPrice: string;
  offerPrice?: string;
  productDescription: string;
  productDate: string;
  productQuantity: string;

  store: any;
  category: any[];
  comments: any[];
}
