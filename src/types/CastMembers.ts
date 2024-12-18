export interface Result {
    data: CastMembers[];
    links: Links
    meta: Meta;
}

export interface CastMembers {
    id: string;
    name: string;
    type: number;
    createdAt: Date;
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