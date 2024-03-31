export interface ProductImage {
  public_id: string;
  url: string;
}

export interface Review {
  user: string; 
  name: string;
  rating: number;
  comment: string;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  ratings: number;
  images: ProductImage[];
  category: string;
  stock: number;
  numOfReviews: number;
  reviews: Review[];
  user: string; 
  createdAt: Date;
}
