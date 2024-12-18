import { Box, ThemeProvider, Typography } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { CategoryCreate } from './features/categories/CategoryCreate';
import { CategoryList } from './features/categories/CategoryList';
import { CategoryUpdate } from './features/categories/CategoryUpdate';
import { ListCastMembers } from './features/cast/ListCastMembers';

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          component="main"
          sx={{
            height: '160vh',
            backgroundColor: (theme) => theme.palette.grey[900]
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route index element={<CategoryList />} />
              {/* category */}
              <Route path="categories" element={<CategoryList />} />
              <Route path="categories/create" element={<CategoryCreate />} />
              <Route path="categories/update/:id" element={<CategoryUpdate />} />

              {/* category */}
              <Route path="cast-members" element={<ListCastMembers />} />

              {/* 404 */}
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
      </SnackbarProvider>
    </ThemeProvider>
  )
}
