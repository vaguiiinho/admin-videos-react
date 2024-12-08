import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Results } from "../../types/category";
import { apiSlice } from "../api/apiSlice";

export interface Category {

    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
    deleted_at: null | string;
    createdAt: string;
    updatedAt: string;
}

const endpointUrl = "/categories"

function deleteCategoryMutation(category: Category) {
    return {
        url: `${endpointUrl}/${category.id}`,
        method: 'DELETE',
    }
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCategories: query<Results, void>({
            query: () => endpointUrl,
            providesTags: ["Categories"]
        }),
        deleteCategory: mutation<Results, { id: string }>({
            query: deleteCategoryMutation,
            invalidatesTags: ["Categories"]
        }),
    })
})

const category: Category = {
    id: "0ce68ddd-4981-4ee2-a23b-a01452b96b01",
    name: "Technology",
    description: "Latest technological news and trends",
    isActive: true,
    deleted_at: null,
    createdAt: "2022-05-12T14:30:00Z",
    updatedAt: "2022-05-12T14:30:00Z"
}

const categories = [
    category,
    { ...category, id: "1ce68ddd-4981-4ee2-a23b-a01bbc8c8bb", name: "Peach", isActive: false },
    { ...category, id: "4ce68ddd-4981-4ee2-a23b-a01bbc8c8bc", name: "Orange" },
    { ...category, id: "5ce68ddd-4981-4ee2-a23b-a01bbc8c8bc", name: "Grape" },
]

export const initialState = categories

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        createCategory: (state, action) => {
            state.push(action.payload)
        },
        listCategory: (state, action) => { },
        updateCategory: (state, action) => {
            const index = state.findIndex((category) => category.id === action.payload.id)
            state[index] = action.payload
        },
        deleteCategory: (state, action) => {
            const index = state.findIndex((category) => category.id === action.payload)
            state.splice(index, 1)
        },
    }
})

// Selectors

export const selectorCategories = (state: RootState) => state.categories

export const selectCategoryById = (state: RootState, id: string) => {
    const category = state.categories.find((category) => category.id === id)
    return category || {
        id: "",
        name: "",
        description: "",
        isActive: false,
        deleted_at: null,
        createdAt: "",
        updatedAt: "",
    }
}



// Action creators

export default categoriesSlice.reducer


export const { createCategory, listCategory, updateCategory, deleteCategory } = categoriesSlice.actions

export const { useGetCategoriesQuery, useDeleteCategoryMutation } = categoriesApiSlice