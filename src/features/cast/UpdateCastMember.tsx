import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CastMember } from "../../types/CastMembers";
import { initialState, useGetCastMemberQuery, useUpdateCastMemberMutation } from "./castMemberSlice";
import { CastMemberForm } from "./components/CastMemberForm";

export function UpdateCastMember() {

    const id = useParams().id || ""
    const { data: castMember, isFetching } = useGetCastMemberQuery({ id });


    const [updateCastMember, status] = useUpdateCastMemberMutation()

    const [castMemberState, setCastMemberState] = useState<CastMember>(initialState)

    const { enqueueSnackbar } = useSnackbar()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await updateCastMember(castMemberState);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCastMemberState({ ...castMemberState, [name]: name === "type" ? Number(value) : value, });
    };

    useEffect(() => {
        if (castMember) {
            setCastMemberState(castMember.data);
        }
    }, [castMember]);



    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar('Cast Member updated!', { variant: "success" })
        }
        if (status.error) {
            enqueueSnackbar('Error updating cast member!', { variant: "error" })
        }

    }, [enqueueSnackbar, status.error, status.isSuccess])

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">
                            Update Category
                        </Typography>
                    </Box>
                </Box>
                <CastMemberForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    isLoading={status.isLoading}
                    castMember={castMemberState}
                    isDisabled={status.isLoading}
                />
            </Paper>
        </Box>
    )
}
