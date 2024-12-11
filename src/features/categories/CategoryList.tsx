import { Box, Button } from "@mui/material";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { CategoryTable } from "./components/CategoryTable";

export function CategoryList() {
    const [paginationModel, setpaginationModel] = useState({page: 1, pageSize:15})
    const options = {search: ''}
    const [rowsPerPage] = useState([5, 10, 15, 20])
    const [search, setSearch] = useState("")

    const { data, isFetching, error } = useGetCategoriesQuery(options);
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation()

    const { enqueueSnackbar } = useSnackbar()

    function onPaginationModelChange(model: GridPaginationModel) {
        console.log(model)
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        console.log(filterModel)
    }

    async function handleDeleteCategory(id: string) {
        await deleteCategory({ id });
    }

    useEffect(() => {
        if (deleteCategoryStatus.isSuccess) {
            enqueueSnackbar("Category deleted", { variant: "success" });
        }
        if (deleteCategoryStatus.error) {
            enqueueSnackbar("Category not deleted", { variant: "error" });
        }
    }, [deleteCategoryStatus, enqueueSnackbar]);

    return (
        <Box maxWidth="lg" sx={{ my: 4 }}>
            <Box display="flex" justifyContent="end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Category
                </Button>
            </Box>
            <CategoryTable
                data={data}
                isFetching={isFetching}
                pageSizeOptions={[5, 10, 15, 20]}
                paginationModel={paginationModel}
                handleDelete={handleDeleteCategory}
                onPaginationModelChange={onPaginationModelChange}
                handleFilterChange={handleFilterChange}
            />
        </Box>
    )
}
