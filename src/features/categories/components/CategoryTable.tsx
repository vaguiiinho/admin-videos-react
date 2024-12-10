import { GridFilterModel } from "@mui/x-data-grid"
import { Results } from "../../../types/category"

type Props = {
    date: Results | undefined
    perPage: number
    isFetching: boolean
    rowsPerPage?: number

    handleOnPageChange: (page: number) => void
    handleFilterChange: (filterModel: GridFilterModel) => void
    handleOnPageSizeChange: (pageSize: number) => void
    handleDelete: (id: number) => void
}

export function CategoryTable({
    date,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange,
    handleDelete,
}: Props) { }
