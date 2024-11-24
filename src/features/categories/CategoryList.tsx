import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectorCategories } from "./categorySlice";


export function CategoryList() {
    const categories = useAppSelector(selectorCategories);

    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description
    }))

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 200 },
    ];

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
            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid pagination pageSizeOptions={[2, 5, 10, 50]} rows={rows} columns={columns} />
            </div>
        </Box>
    )
}
