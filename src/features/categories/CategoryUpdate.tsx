import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Category } from "../../types/Category";
import { useGetCategoryQuery, useUpdateCategoryMutation } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
export function CategoryUpdate() {

    const id = useParams().id || ""
    const { data: category, isFetching } = useGetCategoryQuery({ id });


    const [updateCategory, status] = useUpdateCategoryMutation()

    const initialState: Category = {
        id: "",
        name: "",
        created_at: "",
        description: "",
        is_active: false,
        updated_at: "",
        deleted_at: "",
    };
    const [categoryState, setCategoryState] = useState<Category>(initialState)

    const { enqueueSnackbar } = useSnackbar()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        await updateCategory(categoryState)
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
                is_active: category.data.is_active,
                created_at: category.data.created_at,
                description: category.data.description,
                updated_at: category.data.updated_at,
                deleted_at: category.data.deleted_at,
            });
        }
    }, [category, isFetching]);

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar('Category updated!', { variant: "success" })
        }
        if (status.error) {
            enqueueSnackbar('Error updating category!', { variant: "error" })
        }

    }, [enqueueSnackbar, status.error, status.isSuccess])

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
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleToggle={handleToggle}
                    isDisabled={status.isLoading}
                />
            </Paper>
        </Box>
    )
}
