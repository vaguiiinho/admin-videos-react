import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { CategoryTable } from "./components/CategoryTable";

export function CategoryList() {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [search, setSearch] = useState("")
    const options = {
        page: paginationModel.page + 1, // Página começa em 1 na API
        totalPage: paginationModel.pageSize,
        filter: search,
    };
    const [rowsPerPage] = useState([5, 10, 15, 20, 50])

    const { data, isFetching, error } = useGetCategoriesQuery(options);
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation()

    const { enqueueSnackbar } = useSnackbar()

    function onPaginationModelChange(model: GridPaginationModel) {
        setPaginationModel(model)
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        if (filterModel.quickFilterValues?.length === 1) {
            const quickFilterValue = filterModel.quickFilterValues.join(" ")
            return setSearch(quickFilterValue)
        }

        return setSearch("")
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

    if (error) {
        console.error("Error fetching categories:", error);
        return <Typography>Error fetching categories</Typography>
    }

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
                pageSizeOptions={rowsPerPage}
                paginationModel={paginationModel}
                handleDelete={handleDeleteCategory}
                handleFilterChange={handleFilterChange}
                onPaginationModelChange={onPaginationModelChange}
            />
        </Box>
    )
}
