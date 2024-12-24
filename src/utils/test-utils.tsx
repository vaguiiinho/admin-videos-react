import { configureStore } from '@reduxjs/toolkit'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import type { RootState } from '../app/store'
// As a basic setup, import your same slice reducers
import { apiSlice } from '../features/api/apiSlice'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: ReturnType<typeof configureStore>
}

export function renderWithProviders(
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {}
) {
    const {

        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: {
                [apiSlice.reducerPath]: apiSlice.reducer,
            },

        }),
        ...renderOptions
    } = extendedRenderOptions

    const Wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>
            <BrowserRouter>
                <SnackbarProvider>
                    {children}
                </SnackbarProvider>
            </BrowserRouter>
        </Provider>
    )

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions })
    }
}