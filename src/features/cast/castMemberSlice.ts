import { CastMember, CastMemberParams, Results } from "../../types/CastMembers";
import { Result } from "../../types/category";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/cast-members"

export const initialState: CastMember = {
    id: "",
    name: "",
    type: 0,
    createdAt: "",
}

function parseQueryParams(params: CastMemberParams) {
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

    if (params.type) {
        query.append("type", params.type.toString());
    }

    return query.toString();
}

function getCastMembers(params: CastMemberParams) {
    const { page = 1, totalPage = 10, filter, type } = params
    return `${endpointUrl}/?${parseQueryParams({
        page,
        totalPage,
        filter,
        type,
    })}`
}

function deleteCastMember({ id }: { id: string }) {
    return {
        url: `${endpointUrl}/${id}`,
        method: 'DELETE',
    }
}

function getCastMember({ id }: { id: string }) {
    return `${endpointUrl}/${id}`
}

function updateCastMember(castMember: CastMember) {
    return {
        url: `${endpointUrl}/${castMember.id}`,
        method: 'PUT',
        body: castMember,
    }
}

function createCastMember(castMember: CastMember) {
    return {
        url: endpointUrl,
        method: 'POST',
        body: castMember,
    }
}


export const castMembersApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCastMembers: query<Results, CastMemberParams>({
            query: getCastMembers,
            providesTags: ["CastMembers"]
        }),
        getCastMember: query<Result, { id: string }>({
            query: getCastMember,
            providesTags: ["CastMembers"]
        }),
        createCastMember: mutation<Result, CastMember>({
            query: createCastMember,
            invalidatesTags: ["CastMembers"]
        }),
        updateCastMember: mutation<Result, CastMember>({
            query: updateCastMember,
            invalidatesTags: ["CastMembers"]
        }),
        deleteCastMember: mutation<Result, { id: string }>({
            query: deleteCastMember,
            invalidatesTags: ["CastMembers"]
        }),
    })
})

export const {
    useGetCastMembersQuery,
    useGetCastMemberQuery,
    useCreateCastMemberMutation,
    useUpdateCastMemberMutation,
    useDeleteCastMemberMutation,
} = castMembersApiSlice