import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import { CastMember } from "../../../types/CastMembers";

type Props = {
    castMember: CastMember
    isDisabled?: boolean
    isLoading?: boolean
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function CastMemberForm({
    castMember,
    isDisabled = false,
    isLoading = false,
    handleSubmit,
    handleChange,
}: Props) {
    return (
        <Box p={2}>
            {
                isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        name="name"
                                        label="Name"
                                        value={castMember.name}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={12}>
                                <FormGroup>
                                    <FormLabel>Type</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="type of cast member"
                                        defaultValue={1}
                                        name="type"
                                        onChange={handleChange}
                                        value={castMember.type}
                                    >
                                        <FormControlLabel value={1} control={<Radio />} label="Director" />
                                        <FormControlLabel value={2} control={<Radio />} label="Actor" />
                                    </RadioGroup>
                                </FormGroup>
                            </Grid>
                            <Grid size={12}>
                                <Box display="flex" gap={2}>
                                    <Button variant="contained" component={Link} to="/cast-members">
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={isDisabled || isLoading}
                                    >
                                        {isLoading ? "Loading..." : "Save"}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                )}
        </Box>
    )
}
