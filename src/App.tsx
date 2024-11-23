import { Box, createTheme, ThemeProvider } from '@mui/material';
import { Header } from './components/Header';
import { Layout } from './components/Layout';

const theme = createTheme({})
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        sx={{
          height: '100vh',

        }}
      >
        <Header />
        <Layout>
          <h1>Ola</h1>
        </Layout>
      </Box>
    </ThemeProvider>
  )
}
