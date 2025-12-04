export interface UserType {
  usertype: string;
}

export interface Category {
  usertype: UserType;
  category: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: Category;
}

export interface ProductInfo {
  name: string;
  price: string;
  numericPrice: number;
  productId: string;
  category?: string;
  quantity?: string;
}