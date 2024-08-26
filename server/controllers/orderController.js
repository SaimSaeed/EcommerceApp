import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../model/Order.js"
// Create Orders 
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No Order Items!")
    } else {
        const order = new Order({
            // mapping the order items because it is an array and add product id and remove the id of orderItems
            orderItems: orderItems.map(x => ({ ...x, product: x._id, _id: undefined })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        return res.status(201).json(createdOrder)
    }


})

// Get User Orders
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    return res.status(200).json(orders)
})

// Get Orders By ID
const getOrderById = asyncHandler(async (req, res) => {
    res.send("Get Order by Id")

})


// Update Order to Paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send("Update Order to Paid")

})


// Update Order to Delivered
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send("Update Order to Delivered")

})

// Get All Orders for Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send("Get All Orders")

})



export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders }
