import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { CastMember } from "../../types/CastMembers"
import { initialState, useCreateCastMemberMutation } from "./castMemberSlice"
import { Box, Paper, Typography } from "@mui/material"
import { CastMemberForm } from "./components/CastMemberForm"

export function CreateCastMember() {
    const [castMemberState, setCastMemberState] = useState<CastMember>(initialState)
    const [createCastMember, status] = useCreateCastMemberMutation()
    const { enqueueSnackbar } = useSnackbar()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCastMemberState({ ...castMemberState, [name]: value })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        await createCastMember(castMemberState)
    }

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar('Category created!', { variant: "success" })
        }

        if (status.error) {
            enqueueSnackbar('Error creating category!', { variant: "error" })
        }
    }, [enqueueSnackbar, status.error, status.isSuccess])

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">
                            Create Cast Member
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
