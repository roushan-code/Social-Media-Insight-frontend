import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { server } from "../../components/constants/config";


const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/`, }),
    tagTypes: ["GetInsight", "AddPost", "postDetails"],

    endpoints: (builder) => ({
        // getEmployee: builder.query({
        //     query: (id) => ({
        //         url: `updateEmployee/${id}`,
        //         credentials: "include",
        //     }),
        //     providesTags: ["Employee"]
        // }),
        // updateEmployee: builder.mutation({
        //     query: ({id, data}) => ({
        //         url: `updateEmployee/${id}`,
        //         method: "PUT",
        //         credentials: "include",
        //         body: data,
        //     }),
        //     invalidatesTags: ["Employee"]
        // }),

        // searchUser: builder.query({
        //     query: (name) => ({
        //         url: `user/search/?name=${name}`,
        //         headers: {
        //             "authorization": `Bearer ${getTokenFromStorage()}`
        //         },
        //         credentials: "include",
        //         }),
        //         providesTags: ["User"]
        // }),

        addPostDetails: builder.mutation({
            query: (data) => ({
                url: `add-media-details`,
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
        postDetails: builder.query({
            query: () => ({
                url: 'get-media-details',
                credentials: "include",
            }),
            providesTags: ["AllEmployees"]
        }),
        getInsight: builder.mutation({
            query: (data) => ({
                url: 'get-insight',
                method: 'POST',
                credentials: "include",
                body: data,
            })
        }),
        // deleteEmployee: builder.mutation({
        //     query: (id) => ({
        //         url: `updateEmployee/${id}`,
        //         method: "DELETE",
        //         credentials: "include",
        //     }),
        //     invalidatesTags: ["Employee"]
        // }),
    }),

    
})

export default api
export const { 
    // useMyChatsQuery, 
    // useSendFriendRequestMutation, 
    
    useAddPostDetailsMutation,
    usePostDetailsQuery,
    useGetInsightMutation,
} = api;