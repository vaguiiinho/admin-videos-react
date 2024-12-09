import {
    Box,
    Paper,
    Typography
} from "@mui/material";
import { useState } from "react";
import { Category } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export function CategoryCreate() {
    const [isDisabled, setIsDisabled] = useState(false)
    const [category, setCategory] = useState<Category>({
        id: "",
        name: "",
        description: "",
        isActive: false,
        deleted_at: null,
        createdAt: "",
        updatedAt: "",
    })

    const handleChange = (e: any) => { }

    const handleToggle = (e: any) => { }

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
                    category={category}
                    isDisabled={isDisabled}
                    isLoading={false}
                    handleSubmit={() => console.log('form submitted')}
                    handleChange={handleChange}
                    handleToggle={handleToggle}
                />
            </Paper>
        </Box>
    )
}
