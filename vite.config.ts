import path from 'path'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  plugins: [
    preact(),
    visualizer({ filename: "dist/stats.html", open: false, gzipSize: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'preact-vendor': ['preact', 'preact/compat', 'react-router-dom'],
          motion: ['motion'],
        },
      },
    },
  },
})
