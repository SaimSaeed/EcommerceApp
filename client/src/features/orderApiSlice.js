import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
       
        createOrder: builder.mutation({
            query: (order) => ({
                url: `${ORDERS_URL}/`,
                method:"POST",
                body:order
        })
        }),
        getOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/`
            }),
            keepUnusedDataFor: 5
        })
    })
})


export const { useCreateOrderMutation } = orderApiSlice 