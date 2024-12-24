import { Category, CategoryParams, Result, Results } from "../../types/category";
import { apiSlice } from "../api/apiSlice";

function parseQueryParams(params: CategoryParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.totalPage) {
        query.append("totalPage", params.totalPage.toString());
    }

    if (params.filter) {
        query.append("filter", params.filter);
    }

    if (params.isActive) {
        query.append("is_active", params.isActive.toString());
    }

    return query.toString();
}

function getCategories({ page = 1, totalPage = 15, filter = "" }) {
    const params = { page, totalPage, filter, isActive: true };
    return `${endpointUrl}?${parseQueryParams(params)}`;
}

const endpointUrl = "/categories"

function deleteCategoryMutation(category: Category) {
    return {
        url: `${endpointUrl}/${category.id}`,
        method: 'DELETE',
    }
}

function createCategoryMutation(category: Category) {
    return {
        url: endpointUrl,
        method: 'POST',
        body: category,
    }
}

function updateCategoryMutation(category: Category) {
    return {
        url: `${endpointUrl}/${category.id}`,
        method: 'PUT',
        body: category,
    }
}

function getCategory({ id }: { id: string }) {
    return `${endpointUrl}/${id}`
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCategories: query<Results, CategoryParams>({
            query: getCategories,
            providesTags: ["Categories"]
        }),
        getCategory: query<Result, { id: string }>({
            query: getCategory,
            providesTags: ["Categories"]
        }),
        createCategory: mutation<Result, Category>({
            query: createCategoryMutation,
            invalidatesTags: ["Categories"]
        }),
        updateCategory: mutation<Result, Category>({
            query: updateCategoryMutation,
            invalidatesTags: ["Categories"]
        }),
        deleteCategory: mutation<Result, { id: string }>({
            query: deleteCategoryMutation,
            invalidatesTags: ["Categories"]
        }),
    })
})

export const {
    useGetCategoryQuery,
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
} = categoriesApiSlice