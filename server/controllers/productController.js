import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../model/Product.js"

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    return res.json(products)
})


const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        return res.json(product)

    }
    else {
        res.status(404)
        throw new Error("Resource Not Found!")
    }
})



export {getProducts,getSingleProduct}