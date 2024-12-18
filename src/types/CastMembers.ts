export interface Results {
    data: CastMember[];
    links: Links
    meta: Meta;
}

export interface Result {
    data: CastMember;
    links: Links
    meta: Meta;
}

export interface CastMember {
    id: string;
    name: string;
    type: number;
    createdAt: string;
}

export interface Links {
    prev: null;
    last: string;
    next: string;
    first: string;
}


export interface Meta {
    to: number;
    from: number;
    total: number;
    perPage: number;
    lastPage: number;
    firstPage: number;
    currentPage: number;
}


export interface CastMemberParams {
    page?: number;
    totalPage?: number;
    filter?: string;
    type?: number;
}