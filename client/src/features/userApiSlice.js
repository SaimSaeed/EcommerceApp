import { USERS_URL} from "../constants";
import { apiSlice } from "./apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method:"POST",
                credentials:"include",
                body:data

            })
        }),
        // register: builder.query({
        //     query: () => ({
        //         url: USERS_URL
        //     }),
        // keepUnusedDataFor:5
        // })
    })
})


export const { useLoginMutation } = userApiSlice 