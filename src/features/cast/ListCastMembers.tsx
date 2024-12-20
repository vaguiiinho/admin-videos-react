import { GridFilterModel, GridPaginationModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDeleteCastMemberMutation, useGetCastMembersQuery } from './castMemberSlice';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { CastMemberTable } from './components/CastMemberTable';

export function ListCastMembers() {
    const [options, setOptions] = useState({
        page: 0,
        totalPage: 10,
        filter: "",
        rowsPerPage: [5, 10, 15, 20, 50]
    })
    const { data, isFetching, error } = useGetCastMembersQuery(options);
    const [deleteCastMember, deleteCastMembersStatus] = useDeleteCastMemberMutation()

    const { enqueueSnackbar } = useSnackbar()

    async function handleDeleteCastMember(id: string) {
        await deleteCastMember({ id })
    }

    function onPaginationModelChange(model: GridPaginationModel) {
        setOptions({
            ...options,
            page: model.page,
            totalPage: model.pageSize,
        })
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        if (filterModel.quickFilterValues?.length === 1) {
            const quickFilterValue = filterModel.quickFilterValues.join(" ")
            return setOptions({
                ...options,
                filter: quickFilterValue,
            })
        }

        return setOptions({
            ...options,
            filter: "",
        })
    }

    useEffect(() => {

        if (deleteCastMembersStatus.isSuccess) {
            enqueueSnackbar(`Cast member deleted, {variant: success}`)
        }
        if (deleteCastMembersStatus.error) {
            enqueueSnackbar(`Cast member not deleted, {variant: error}`)
        }
    }, [deleteCastMembersStatus, enqueueSnackbar]);

    if (error) {
        return <Typography>Error fetching categories</Typography>
    }

    return (
        <Box maxWidth="lg" sx={{ my: 4 }}>
            <Box display="flex" justifyContent="end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/cast-members/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Cast Member
                </Button>
            </Box>
            <CastMemberTable
                data={data}
                isFetching={isFetching}
                pageSizeOptions={options.rowsPerPage}
                paginationModel={{ page: options.page, pageSize: options.totalPage }}
                handleDelete={handleDeleteCastMember}
                handleFilterChange={handleFilterChange}
                onPaginationModelChange={onPaginationModelChange}
            />
        </Box>
    )
}
