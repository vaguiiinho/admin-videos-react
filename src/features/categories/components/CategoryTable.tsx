import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Results } from "../../../types/Category";
type Props = {
  paginationModel: GridPaginationModel
  isFetching: boolean
  pageSizeOptions: number[]
  data: Results | undefined

  handleDelete: (id: string) => void
  onPaginationModelChange: (model: GridPaginationModel) => void
  handleFilterChange: (filterModel: GridFilterModel) => void
};

export function CategoriesTable({
  data,
  isFetching,
  handleDelete,
  paginationModel,
  pageSizeOptions,
  handleFilterChange,
  onPaginationModelChange,
}: Props) {

  const slotProps = { toolbar: { showQuickFilter: true, }, };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, renderCell: renderNameCell },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    {
      field: "id",
      headerName: "Actions",
      type: "string",
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      isActive: category.is_active,
      created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
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
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
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