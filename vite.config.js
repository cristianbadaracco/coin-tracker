import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "promp",
  includeAssets: ["favicon.ico"],
  manifest: {
    name: "Coin Tracker",
    short_name: "coin-tracker",
    description: "",
    icons: [
      {
        src: "/public/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/public/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/public/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/public/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#f69435",
    background_color: "#f69435",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
});
