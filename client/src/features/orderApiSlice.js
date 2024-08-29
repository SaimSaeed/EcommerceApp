import { ORDERS_URL } from "../constants";
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
        })
    })
})


export const { useCreateOrderMutation,useGetOrderDetailsQuery } = orderApiSlice 