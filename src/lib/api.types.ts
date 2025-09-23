import { UUID } from "crypto";

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    admin: boolean | false;
    upToDateTerms: boolean | true;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    admin: boolean,
    upToDateTerms: boolean
}


export interface Product {
    uuid: string;
    price: number;
    promotionalPrice: number;
    shortName: string;
    longName: string;
    shortDescription: string;
    stock: number;
    storeUUID: string;
    categoryUUID: string;
    storeName: string;
    searchTags: string[];
    categoryName: string;
    condition: string;
    imageUrls: string[];
    feedbacks: Feedback[];
    materials: {
        [key: string]: number;
    }
}

export interface Feedback {
    userUUID: string;
    visibility: 'PUBLIC' | 'ONLY_STORE';
    rating: number;
    comment: string;
    date: string;
}

export interface Store {
  uuid: string;
  name: string;
  completeName: string;
  address: Address;
  feedbackStars: number;
  logoUrl: string;
  proposal: string;
  bannerUrl: string;
  description: string;
  products: string[];
  sells: number;
  badges: StoreBadge[];
}

export interface Address {
  country: string;
  state: string;
  zipCode: string;
  addressLineOne: string;
  addressLineTwo: string;
  additionalInfo: string;
}

export enum StoreBadge {
    NEW,
    BEST_SELLER,
    PLATINUM,
    DIAMOND,
    OFFICIAL
}

// Tipos adicionais para requests da API
export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    storeUuid: string;
}

export interface UpdateProductRequest {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    category?: string;
    storeUuid?: string;
}

export interface ProductFilters {
    category?: string;
    minStock?: number;
    maxPrice?: number;
    storeUUID?: string;
}

export interface CreateStoreRequest {
    name: string;
    description: string;
    ownerUuid: string;
}

export interface UpdateStoreRequest {
    name?: string;
    description?: string;
    ownerUuid?: string;
}

export interface StoreFilters {
    name?: string;
    minSells?: number;
}

// Tipos para responses da API baseados na documentação
export interface UserResponse {
    uuid: string;
    name: string;
    email: string;
    phone?: string;
}

export interface ProductResponse {
    uuid: string;
    shortName: string;
    longName: string;
    shortDescription: string;
    price: number;
    promotionalPrice: number;
    stock: number;
    categoryUUID: string;
    categoryName: string;
    storeName: string;
    searchTags: string[];
    condition: 'NEW' | 'USED' | 'REFURBISHED' | 'DAMAGED';
    imageUrls: string[];
    feedbacks: Feedback[];
    materials: {
        [key: string]: number;
    }
}

export interface StoreResponse {
    uuid: string;
    name: string;
    description: string;
    ownerUuid?: string | undefined;
    sells: number;
    products: ProductResponse[];
}