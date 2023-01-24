import '../styles/globals.css'
import type { AppProps } from 'next/app'

import MainLayout from '../layouts/MainLayout'
import AuthProvider from '../provider/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </AuthProvider>
    )
}

export default MyApp
