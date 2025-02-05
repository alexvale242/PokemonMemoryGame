import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    assetsInclude: ['**/*.png', '**/*.svg', '**/*.ico'],
    base: '/',
    build: {
        outDir: './docs',
    },
})