// vite.config.ts
import { defineConfig } from "file:///C:/proyectotype/protype/node_modules/vite/dist/node/index.js";
import react from "file:///C:/proyectotype/protype/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig(
  {
    base: "./",
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            mui: ["@mui/material", "@mui/icons-material"],
            vendor: ["axios", "lodash"]
          }
        }
      }
    }
  }
);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxwcm95ZWN0b3R5cGVcXFxccHJvdHlwZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxccHJveWVjdG90eXBlXFxcXHByb3R5cGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3Byb3llY3RvdHlwZS9wcm90eXBlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhcbiAgXG4gIHtcbiAgICBiYXNlOiAnLi8nLFxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgICBcbiAgICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICByZWFjdDogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICBtdWk6IFsnQG11aS9tYXRlcmlhbCcsICdAbXVpL2ljb25zLW1hdGVyaWFsJ10sXG4gICAgICAgICAgdmVuZG9yOiBbJ2F4aW9zJywgJ2xvZGFzaCddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UCxTQUFTLG9CQUFvQjtBQUMxUixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUTtBQUFBLEVBRWI7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxJQUVqQixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixjQUFjO0FBQUEsWUFDWixPQUFPLENBQUMsU0FBUyxXQUFXO0FBQUEsWUFDNUIsS0FBSyxDQUFDLGlCQUFpQixxQkFBcUI7QUFBQSxZQUM1QyxRQUFRLENBQUMsU0FBUyxRQUFRO0FBQUEsVUFDNUI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUVGO0FBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
