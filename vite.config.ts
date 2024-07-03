import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      "@": "/src",
      "components": "@/components",
      "pages": "@/pages",
      "hooks": "@/hooks",
      "layouts": "@/layouts",
      "constants": "@/lib/constants",
      "utils": "@/lib/utils",
      "types": "@/lib/types",
      "providers": "@/providers",
      "routes": "@/routes",
    },
  }
});