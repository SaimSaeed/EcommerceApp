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


const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "Sample Name",
        price: 0,
        user: req.user._id,
        imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
        brand: "Sample Brand",
        category: "Sample Category",
        countInStock: 0,
        reviewNum: 0,
        description: "Sample Description",
    })
    const createdProduct = await product.save()
    return res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
    
  const product = await Product.findById(req.params.id)
  if(product){
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.imageSrc = req.body.imageSrc;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;

    const updatedProduct = await product.save()
    return res.status(200).json(updatedProduct)
  }else{
    res.status(404)
    throw new Error("Product Not Found!")
  }
})



const deleteProduct = asyncHandler(async (req,res)=>{
   const product = await Product.findById(req.params.id)
   if(product){
  await Product.deleteOne({_id:product._id})
  res.status(200).json({message:"Product Deleted!"})
   }else{
    res.status(404)
    throw new Error("Product Not Found!")
   }

})



export { getProducts, getSingleProduct, createProduct,updateProduct,deleteProduct }