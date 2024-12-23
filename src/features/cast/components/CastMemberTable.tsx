import { DeleteSharp } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import {
    DataGrid,
    GridColDef,
    GridFilterModel,
    GridPaginationModel,
    GridRenderCellParams,
    GridToolbar
} from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { Results } from "../../../types/CastMembers"

type Props = {
    paginationModel: any
    isFetching: boolean
    pageSizeOptions: number[]
    data: Results | undefined

    handleDelete: (id: string) => void
    onPaginationModelChange: (model: GridPaginationModel) => void
    handleFilterChange: (filterModel: GridFilterModel) => void
}

export function CastMemberTable({
    data,
    isFetching,
    handleDelete,
    paginationModel,
    pageSizeOptions,
    handleFilterChange,
    onPaginationModelChange,
}: Props) {
    const slotProps = {
        toolbar: {
            showQuickFilter: true,
        },
    };

    const columns: GridColDef[] = [
        {
            flex: 1,
            field: 'name',
            headerName: 'Name',
            renderCell: renderNameCell
        },
        {
            flex: 1,
            field: 'type',
            headerName: 'Type',
            renderCell: renderTypeCell
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
        const { data: castMembers } = data;
        return castMembers.map((castMember) => ({
            id: castMember.id,
            name: castMember.name,
            type: castMember.type,
        }));
    }

    function renderTypeCell(row: GridRenderCellParams) {
        return (
            <Typography color="primary">
                {row.value === 1 ? "Director" : "Actor"}
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
                to={`/cast-members/update/${row.id}`}>
                <Typography color="primary">{row.value}</Typography>
            </Link>
        )
    }

    const rows = data ? mapDataToGridRows(data) : [];
    const rowCount = data?.meta.total || 0;

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
                disableColumnSelector={true}
                disableDensitySelector={true}
                slots={{ toolbar: GridToolbar }}
                pageSizeOptions={pageSizeOptions}
                disableRowSelectionOnClick={true}
                paginationModel={paginationModel}
                onFilterModelChange={handleFilterChange}
                onPaginationModelChange={onPaginationModelChange}
            />
        </Box>
    )
}
