import { DeleteSharp } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import {
    DataGrid,
    GridColDef,
    GridFilterModel,
    GridPaginationModel,
    GridRenderCellParams,
    GridRowsProp,
    GridToolbar,
} from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { Results } from "../../../types/category"

type Props = {
    paginationModel: any
    isFetching: boolean
    pageSizeOptions: number[]
    data: Results | undefined

    handleDelete: (id: string) => void
    onPaginationModelChange: (model: GridPaginationModel) => void
    handleFilterChange: (filterModel: GridFilterModel) => void
}

export function CategoryTable({
    data,
    paginationModel,
    isFetching,
    pageSizeOptions,
    handleDelete,
    onPaginationModelChange,
    handleFilterChange,
}: Props) {
    const slotProps = {
        toolbar: {
            showQuickFilter: true,
        },
    };

    const rows: GridRowsProp = data ? mapDataToGridRows(data) : []


    const columns: GridColDef[] = [
        {
            flex: 1,
            field: 'name',
            headerName: 'Name',
            renderCell: renderNameCell
        },
        {
            flex: 1,
            type: "boolean",
            field: 'isActive',
            headerName: 'Is Active',
            renderCell: renderCellIsActive
        },
        {
            flex: 1,
            field: 'createdAt',
            headerName: 'Created At',
        },
        {
            flex: 1,
            field: 'id',
            type: "string",
            headerName: 'Actions',
            renderCell: renderActionsCell
        },
    ];

    function mapDataToGridRows(data: Results) {
        const { data: categories } = data;
        return categories.map((category) => ({
            id: category.id,
            name: category.name,
            isActive: category.is_active,
            description: category.description,
            createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
        }));
    }

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
                color="secondary"
                aria-label="Delete"
                onClick={() => handleDelete(row.value)}
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

    const rowCount = data?.meta.total || 0

    return (
        <Box sx={{ display: "flex", height: 600 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                rowCount={rowCount}
                filterMode="server"
                loading={isFetching}
                slotProps={slotProps}
                paginationMode="server"
                checkboxSelection={false}
                disableColumnFilter={true}
                pageSizeOptions={pageSizeOptions}
                disableColumnSelector={true}
                disableDensitySelector={true}
                slots={{ toolbar: GridToolbar }}
                disableRowSelectionOnClick={true}
                onFilterModelChange={handleFilterChange}
                onPaginationModelChange={onPaginationModelChange}
                paginationModel={paginationModel}
            />
        </Box>
    )
}
