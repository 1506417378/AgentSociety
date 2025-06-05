import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://8.137.80.116:8080',
                changeOrigin: true,
            }
        }
    },
    plugins: [react()],
    base: '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
    },
    assetsInclude:['**/*.pdf']
})
