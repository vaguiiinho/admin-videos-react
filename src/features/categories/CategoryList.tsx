import { DeleteSharp } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridRowsProp,
    GridToolbar
} from '@mui/x-data-grid';
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";


export function CategoryList() {
    const { data, isFetching, error } = useGetCategoriesQuery();
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation()

    const slotProps = {
        toolbar: {
            showQuickFilter: true,
        },
    };

    const { enqueueSnackbar } = useSnackbar()

    const rows: GridRowsProp = data ? data.data.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
        isActive: category.is_active,
    })) : []

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: renderNameCell
        },
        {
            field: 'isActive',
            headerName: 'Is Active',
            flex: 1,
            type: "boolean",
            renderCell: renderCellIsActive
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1,
        },
        {
            field: 'id',
            headerName: 'Actions',
            type: "string",
            flex: 1,
            renderCell: renderActionsCell
        },
    ];

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
    }, [deleteCategoryStatus, enqueueSnackbar])

    function renderCellIsActive(row: GridRenderCellParams) {
        return (
            <Typography color={row.value ? "primary" : "secondary"}>
                {row.value ? "Active" : "Inactive"}
            </Typography>
        )
    }

    function renderActionsCell(row: GridRenderCellParams) {
        return (
            <IconButton
                aria-label="Delete"
                color="secondary"
                onClick={() => handleDeleteCategory(row.value)}
            >
                <DeleteSharp />
            </IconButton>
        )
    }


    // Exemplo :
    // function renderNameCell(row: GridRenderCellParams) {
    //     return (
    //         <Typography
    //             sx={{ textDecoration: 'none', color: 'inherit' }}
    //             component={Link}
    //             to={`/categories/update/${row.id}`}>
    //             {row.value}
    //         </Typography>
    //     )
    // }

    function renderNameCell(row: GridRenderCellParams) {
        return (
            <Link
                style={{ textDecoration: 'none' }}
                to={`/categories/update/${row.id}`}>
                <Typography color="primary">{row.value}</Typography>
            </Link>
        )
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
            <Box sx={{ display: "flex", height: 600 }}>
                <DataGrid
                    pagination
                    pageSizeOptions={[2, 5, 10, 50, 100]}
                    disableColumnSelector={true}
                    disableColumnFilter={true}
                    disableDensitySelector={true}
                    disableRowSelectionOnClick={true}
                    rows={rows}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={slotProps}
                />
            </Box>
        </Box>
    )
}
