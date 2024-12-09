import {
    Box,
    Paper,
    Typography
} from "@mui/material";
import { useState } from "react";
import {
    useParams
} from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategoryById } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
export function CategoryUpdate() {

    const id = useParams().id || ""
    const category = useAppSelector((state) => selectCategoryById(state, id))
    const [isDisabled, setIsDisabled] = useState(false)

    const handleChange = (e: any) => { }
    const handleToggle = (e: any) => { }

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
