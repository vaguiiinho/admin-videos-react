import { IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Results } from "../../../types/CastMembers";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

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

  const slotProps = { toolbar: { showQuickFilter: true } };

  const columns: GridColDef[] = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
      renderCell: renderNameCell,
    },
    {
      flex: 1,
      field: "type",
      headerName: "Type",
      renderCell: renderTypeCell,
    },
    {
      flex: 1,
      field: "id",
      headerName: "Actions",
      renderCell: renderActionsCell,
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

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(params.value)}
        aria-label="delete"
        data-testid="delete-button"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/cast-members/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  function renderTypeCell(rowData: GridRenderCellParams) {
    return (
      <Typography color="primary">
        {rowData.value === 1 ? "Diretor" : "Actor"}
      </Typography>
    );
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