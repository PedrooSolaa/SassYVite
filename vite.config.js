import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    root: "./src",
    build: {
        outDir: "../docs",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "./src/index.html"),
                formulario: resolve(__dirname, "./src/formulario.html")
            },
        },
    },
    base: "./",
});