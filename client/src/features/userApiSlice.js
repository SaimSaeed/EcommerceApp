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
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/`,
                method:"POST",
                credentials:"include",
                body:data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method:"POST",
                credentials:"include"
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method:"PUT",
                body:data
            })
        })
    })
})


export const { useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileMutation } = userApiSlice 