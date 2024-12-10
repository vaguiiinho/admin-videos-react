export interface Results {
    data: Category[];
    links: Links;
    meta: Meta;
}

export interface Result {
    data: Category;
    links: Links;
    meta: Meta;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    created_at: Date;
}

export interface Links {
    prev: null;
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

export interface CategoryParams {
    page?: number;
    per_page?: number;
    search?: string;
    isActive?: boolean;
}
