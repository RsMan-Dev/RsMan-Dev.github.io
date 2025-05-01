import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  base: '/rsman.github.io/',
  build: {
    outDir: 'dist',
  },
})
