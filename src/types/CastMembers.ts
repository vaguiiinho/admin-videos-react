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
    prev: string;
    last: string;
    next: string;
    first: string;
}


export interface Meta {
    total: number;
    current_page: number;
    first_page: number;
    last_page: number;
    per_page: number;
    to: number;
    from: number;
}


export interface CastMemberParams {
    page?: number;
    totalPage?: number;
    filter?: string;
    type?: number;
}