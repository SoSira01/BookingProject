import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// ### import เพิ่ม ####
import importMetaEnv from "@import-meta-env/unplugin"
import { fileURLToPath, URL } from "url"

// ### install เพิ่ม ####
// npm install @import-meta-env/unplugin --save-dev

// https://vitejs.dev/config/  // base:'/ssi5/'
export default defineConfig({
  base: 'http://intproj21.sit.kmutt.ac.th/ssi5/',
  plugins: [ vue() ],
  // plugins: [vue(), importMetaEnv.vite({ example: ".env.production" })],
  // resolve: {
  //   alias: {
  //     "@": fileURLToPath(new URL("./src", import.meta.url)),
  //   },
  // },
})

// Reference
// https://github.com/iendeavor/import-meta-env/blob/main/packages/examples/create-vue-app-example/vite.config.js
// https://iendeavor.github.io/import-meta-env/
// https://iendeavor.github.io/import-meta-env/guide.html
// https://cli.vuejs.org/guide/mode-and-env.html