import {
    Box,
    Paper,
    Typography
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Category, useCreateCategoryMutation } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export function CategoryCreate() {
    const { enqueueSnackbar } = useSnackbar()
    const [createCategory, status] = useCreateCategoryMutation()
    const [isDisabled, setIsDisabled] = useState(false)
    const [categoryState, setCategoryState] = useState<Category>({
        id: "",
        name: "",
        description: "",
        isActive: false,
        deleted_at: null,
        createdAt: "",
        updatedAt: "",
    })

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        await createCategory(categoryState)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCategoryState({ ...categoryState, [name]: value })
    }

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCategoryState({ ...categoryState, [name]: checked });
    };

    useEffect(() => {
        if (status.isSuccess) {
            setIsDisabled(true)
            enqueueSnackbar('Category created!', { variant: "success" })
        }

        if (status.error) {
            setIsDisabled(false)
            enqueueSnackbar('Error creating category!', { variant: "error" })
        }
    }, [enqueueSnackbar, status.error, status.isSuccess])

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">
                            Create Category
                        </Typography>
                    </Box>
                </Box>
                <CategoryForm
                    isLoading={false}
                    isDisabled={isDisabled}
                    category={categoryState}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleToggle={handleToggle}
                />
            </Paper>
        </Box>
    )
}
