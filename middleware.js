export { default } from "next-auth/middleware"

export const config = { matcher: ["/shop", "/creatordashboard", "/productcreation", "/warenkorb", "/product/:path*", "/orders"] }