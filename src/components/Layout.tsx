import { ReactNode } from "react";
import { Box, Container } from "@mui/material";

export function Layout({ children }: { children: ReactNode }) {
    return (
        <Box>
            <Container maxWidth="lg" sx={{ my: 4, color: "white"}}>
                {children}
            </Container>
        </Box>
    )
}
