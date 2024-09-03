export const BASE_URL = process.env.NODE_ENV === "development" ? 
"http://localhost:7000" : ""

export const PRODUCTS_URL = "/api/products"
export const USERS_URL = "/api/user"
export const ORDERS_URL = "/api/order"
export const STRIPE_URL = "/api/config/stripe"
