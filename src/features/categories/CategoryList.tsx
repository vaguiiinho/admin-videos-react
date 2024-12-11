import { Box, Button } from "@mui/material";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { CategoryTable } from "./components/CategoryTable";

export function CategoryList() {
    const { data, isFetching, error } = useGetCategoriesQuery();
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation()

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: data?.meta.current_page ?? 0, // Padrão: página 0
        pageSize: data?.meta.per_page ?? 10, // Padrão: 10 itens por página
    });

    const [rowsPerPage] = useState([5, 10, 15, 20])

    const [search, setSearch] = useState("")

    // const [queryOptions, setQueryOptions] = useState({});

    // const onFilterChange = useCallback((filterModel: GridFilterModel) => {
    //     // Here you save the data you need from the filter model
    //     setQueryOptions({ filterModel: { ...filterModel } });
    // }, []);

    const { enqueueSnackbar } = useSnackbar()

    async function handleDeleteCategory(id: string) {
        await deleteCategory({ id });
    }

    useEffect(() => {
        if (data?.meta) {
            setPaginationModel({
                page: data.meta.current_page - 1, // Ajustando para índice baseado em zero
                pageSize: data.meta.per_page,
            });
        }

    }, [data]);

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
                pageSizeOptions={rowsPerPage}
                perPage={paginationModel}
                handleDelete={handleDeleteCategory}
                handleOnPageChange={setPaginationModel}
                handleFilterChange={() => { }}
            />
        </Box>
    )
}
