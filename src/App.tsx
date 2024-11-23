import { Box, ThemeProvider, Typography } from '@mui/material';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { Route, Routes } from 'react-router-dom';


export const Home = () => {
  return (
    <Box>
      <Typography variant="h1" component="h1">
        Home Page
      </Typography>
    </Box>
  )
}

export const About = () => {
  return (
    <Box>
      <Typography variant="h1" component="h1">
        About Page
      </Typography>
    </Box>
  )
}


export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box
        component="main"
        sx={{
          height: '100vh',
          backgroundColor: (theme) => theme.palette.grey[900]
        }}
      >
        <Header />
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
          </Routes>

        </Layout>
      </Box>
    </ThemeProvider>
  )
}
