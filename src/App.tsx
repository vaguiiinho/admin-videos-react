import { Box, ThemeProvider, Typography } from '@mui/material';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { Route, Routes } from 'react-router-dom';
import { CategoryList } from './features/categories/CategoryList';
import { CategoryUpdate } from './features/categories/CategoryUpdate';
import { CategoryCreate } from './features/categories/CategoryCreate';

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
            <Route index element={<CategoryList />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="categories/create" element={<CategoryCreate />} />
            <Route path="categories/update/:id" element={<CategoryUpdate />} />

            <Route path="*" element={
              <Box sx={{ color: "white" }}>
                <Typography variant="h1">
                  404
                </Typography>
                <Typography variant="h2">
                  Page Not Found
                </Typography>
              </Box>
            } />
          </Routes>

        </Layout>
      </Box>
    </ThemeProvider>
  )
}
