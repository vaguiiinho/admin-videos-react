import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
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
    return null
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
    // @ts-ignore
    endpoints: () => null
})