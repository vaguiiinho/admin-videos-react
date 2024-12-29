export interface Results {
    data: Category[];
    meta: Meta;
}

export interface Result {
    data: Category;
    meta: Meta;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    created_at: string;
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
    totalPage?: number;
    filter?: string;
    isActive?: boolean;
}
