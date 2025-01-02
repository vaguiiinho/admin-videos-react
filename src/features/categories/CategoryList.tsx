import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";

import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CategoriesTable } from "./components/CategoryTable";

export const CategoryList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [search, setSearch] = useState("")
  const options = {
    page: paginationModel.page + 1, // Página começa em 1 na API
    perPage: paginationModel.pageSize,
    search: search,
  };
  const [rowsPerPage] = useState([5, 10, 15, 20, 50])


  const { data, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteStatus] = useDeleteCategoryMutation();

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
    if (deleteStatus.isSuccess) {
      enqueueSnackbar(`Category deleted`, { variant: "success" });
    }
    if (deleteStatus.error) {
      enqueueSnackbar(`Category not deleted`, { variant: "error" });
    }
  }, [deleteStatus.error, deleteStatus.isSuccess, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching categories</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
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
      <CategoriesTable
        data={data}
        isFetching={isFetching}
        pageSizeOptions={rowsPerPage}
        paginationModel={paginationModel}
        handleDelete={handleDeleteCategory}
        handleFilterChange={handleFilterChange}
        onPaginationModelChange={onPaginationModelChange}
      />
    </Box>
  );
};