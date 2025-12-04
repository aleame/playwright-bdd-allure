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

export interface AccountInfo {
  gender: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  day_birth: string;
  month_birth: string;
  year_birth: string;
  company: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile_phone: string;
}
