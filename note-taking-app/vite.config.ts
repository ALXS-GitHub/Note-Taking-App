/* eslint-disable */
import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {
        
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: '/src/components',
      },
      {
        find: '@utils',
        replacement: '/src/utils',
      },
      {
        find: '@constants',
        replacement: '/src/constants',
      },
      {
        find: '@hooks',
        replacement: '/src/hooks',
      },
      {
        find: '@store',
        replacement: '/src/store',
      },
      {
        find: '@assets',
        replacement: '/src/assets',
      },
      {
        find: '@pages',
        replacement: '/src/pages',
      },
      {
        find: '@services',
        replacement: '/src/services',
      },
      {
        find: '@types',
        replacement: '/src/types',
      },
      {
        find: '@db',
        replacement: '/src/db',
      },
      {
        find: '@',
        replacement: '/src',
      },
    ]
  },
})
