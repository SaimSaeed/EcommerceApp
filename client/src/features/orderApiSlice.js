import { ORDERS_URL, STRIPE_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
       
        createOrder: builder.mutation({
            query: (order) => ({
                url: `${ORDERS_URL}/`,
                method:"POST",
                credentials:"include",
                body:order
        })
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`
            }),
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: (orderId,details) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method:"PUT",
                body:{...details}
            })
        }),
        getStripePublishableKey: builder.query({
            query: (orderId,details) => ({
                url: `${STRIPE_URL}`
            }),
            keepUnusedDataFor:5
        })
    })
})


export const { useCreateOrderMutation,useGetOrderDetailsQuery,usePayOrderMutation,useGetStripePublishableKeyQuery } = orderApiSlice 