import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"
dotenv.config()


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:3000",  // Replace this with the correct port if different
    credentials: true,  // Allow credentials like cookies
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/api/products",productRoutes)
app.use("/api/user",authRoutes)
app.use("/api/order",orderRoutes)

app.use(notFound)
app.use(errorHandler)


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database is Connected!")
})
.catch((err)=>{
    console.log(err)
})


const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log("Server is Running!",port)
})