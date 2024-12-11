import {
    Box,
    Paper,
    Typography
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import {
    useParams
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Category, selectCategoryById, updateCategory, useGetCategoryQuery } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
export function CategoryUpdate() {

    const id = useParams().id || ""
    const { data: category, isFetching } = useGetCategoryQuery({ id });

    const [isDisabled, setIsDisabled] = useState(false)

    const initialState: Category = {
        id: "",
        name: "",
        description: "",
        is_active: false,
        created_at: "",
    };
    const [categoryState, setCategoryState] = useState<Category>(initialState)

    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(updateCategory(categoryState))
        enqueueSnackbar('Success updated category!', { variant: "success" })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCategoryState({ ...categoryState, [name]: value })
    }
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setCategoryState({ ...categoryState, [name]: checked })
    }

    useEffect(() => {
        if (category?.data && !isFetching) {
            setCategoryState({
                id: category.data.id,
                name: category.data.name,
                description: category.data.description,
                is_active: category.data.is_active,
                created_at: category.data.created_at,
            });
        }
    }, [category, isFetching]);


    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">
                            Update Category
                        </Typography>
                    </Box>
                </Box>
                <CategoryForm
                    isLoading={isFetching}
                    category={categoryState}
                    isDisabled={isDisabled}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleToggle={handleToggle}
                />
            </Paper>
        </Box>
    )
}
