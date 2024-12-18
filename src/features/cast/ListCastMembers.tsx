import { GridFilterModel, GridPaginationModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useGetCastMembersQuery } from './castMemberSlice';
import { Typography } from '@mui/material';

export function ListCastMembers() {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [search, setSearch] = useState("")
    const [rowsPerPage] = useState([5, 10, 15, 20, 50])
    const options = {
        page: paginationModel.page + 1, // Página começa em 1 na API
        totalPage: paginationModel.pageSize,
        filter: search,
    };

    const { data, isFetching, error } = useGetCastMembersQuery(options);

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

    useEffect(() => {
        if (error) {
            console.log(error)
        }
    }, [error]);

    if (error) {
        return <Typography>Error fetching categories</Typography>
    }

    return (
        <div>ListCastMembers</div>
    )
}
