export interface Seller {
  name: string
  role: string
  avatar: string
  description: string
}

export interface RelatedProduct {
  id: number
  name: string
  price: number
  image: string
}

export interface Review {
  id: number
  rating: number
  date: string
  comment: string
  images?: string[]
}

export interface Product {
  id: number
  name: string
  price: string
  priceNumber: number
  rating: number
  reviews: number
  status: string
  quantity: number
  availableQuantity: number
  images: string[]
  description: string
  seller: Seller
  details: {
    material: string
    origin: string
    finishing: string
    sustainability: string
  }
  included: string[]
  whyChoose: string[]
  relatedProducts: RelatedProduct[]
  reviewsData: Review[]
}