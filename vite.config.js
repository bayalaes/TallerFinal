import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/js/app.jsx",
                "resources/css/app.css",
                "resources/css/StudentForm.css",
            ],
            refresh: true,
        }),
        react(),
    ],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8000", // Cambia esto si tu servidor Laravel corre en un puerto diferente
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
