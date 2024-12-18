import { CastMember, CastMemberParams, Results } from "../../types/CastMembers";
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
export const castMembersApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query }) => ({
        getCastMembers: query<Results, CastMemberParams>({
            query: getCastMembers,
            providesTags: ["CastMembers"]
        })
    })
})

export const {
    useGetCastMembersQuery,
} = castMembersApiSlice