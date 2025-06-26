export type Availability = {
  days: Array<{
    value: any;
    day: string;
    from: string;
    to: string;
  }>;
  classes?: Array<{
    day: string;
    value?: any;
    sessions: Array<{
      from: string;
      to: string;
    }>;
  }>;
};

export interface ListingInterface {
  projectName: any;
  productImage: string;
  productGallery: any;
  taps: { Description: string; Ingredients: string; 'How to Use': string; Reviews: never[] };
  standardPrice: any;
  productDate: any;
  store: any;
  productName: any;
  id?: string;
  title: string;
  credits: string;
  vendor: string;
  images: Array<string>;
  hours?: number;
  description?: string;
  publish?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  totalRating?: number;
  totalReviews: number;
  availability: Availability;
  category: any;
  ratings: Array<IServicesReview>;
  reviews: Array<IServicesReview>;
  isFuture: boolean;
  date: Date;
  type?: string;
  class?: boolean;
  // attachments?: Array<string>;
}

export type IServicesReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  isPurchased: boolean;
  attachments?: string[];
  createdAt: Date;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    profilePicture: string;
  };
};

export type IPostHero = {
  title: string;
  coverUrl: string;
  createdAt?: Date;
  author?: {
    name: string;
    avatarUrl: string;
  };
};

export interface IRating {
  id?: number;
  name: string;
  starCount: number;
  reviewCount: number;
}

export interface IAvailability {
  // Define availability properties based on your needs
  days?: string[];
  startTime?: string;
  endTime?: string;
}

export interface IServiceCategory {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IService {
  id: number;
  title: string;
  hours?: number;
  credits?: number;
  vendor: string;
  availability: {
    days?: Array<{
      day: string;
      from?: string;
      to?: string;
      sessions?: Array<{
        from: string;
        to: string;
      }>;
    }>;
    class?: boolean;
  };
  images?: string[];
  publish?: boolean;
  description?: string;
  category?: IServiceCategory;
  categoryId?: number;
  isFuture?: boolean;
  date?: string;
  class?: boolean;
  ratings?: Array<{
    id?: number;
    name: string;
    starCount: number;
    reviewCount: number;
  }>;
  totalRating?: number;
  totalReviews?: number;
  reviews?: any[];
}

export interface CreateServiceDto {
  title: string;
  hours?: number;
  credits?: number;
  vendor: string;
  availability?: CreateAvailabilityDto;
  images?: string[];
  publish?: boolean;
  description: string;
  categoryId?: number;
  isFuture?: boolean;
  date?: string;
  class?: boolean;
  ratings?: RatingDto[];
}

export interface UpdateServiceDto {
  title?: string;
  hours?: number;
  credits?: number;
  vendor?: string;
  availability?: CreateAvailabilityDto;
  images?: string[];
  publish?: boolean;
  description?: string;
  categoryId?: number;
  isFuture?: boolean;
  date?: string;
  class?: boolean;
  ratings?: RatingDto[];
}

export interface CreateAvailabilityDto {
  days?: Array<{
    day: string;
    from?: string;
    to?: string;
    sessions?: Array<{
      from: string;
      to: string;
    }>;
  }>;
  class?: boolean;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
}

export interface RatingDto {
  name: string;
  starCount: number;
  reviewCount: number;
}

export interface CreateRatingDto {
  name: string;
  starCount: number;
  reviewCount: number;
}
