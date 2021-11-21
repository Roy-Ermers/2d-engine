/// <references lib="@types/node" />
import * as esbuild from "esbuild";
import { rm, stat, copyFile, mkdir } from "fs/promises";
import { resolve, join } from 'path';
const fileExists = async path => !!(await stat(path).catch(() => false));
const cleanPlugin = {
    name: "clean build",

    setup(build) {
        build.onStart(async () => {
            console.clear();
            const buildDir = resolve(build.initialOptions.outdir);
            if (await fileExists(buildDir))
                await rm(buildDir, { recursive: true });

            await mkdir(buildDir);

            const html = resolve("index.html");
            const target = join(buildDir, "index.html");
            await copyFile(html, target)
        });
    }
};

esbuild.build({
    entryPoints: [
        'src/Runtime/index.ts',
        'src/Game/main.ts',
    ],
    outdir: "./dist",
    bundle: true,
    format: "esm",
    splitting: true,
    keepNames: true,
    sourcemap: 'inline',
    watch: process.env.NODE_ENV != 'production',
    logLevel: "info",
    plugins: [cleanPlugin]
}).catch(process.exit).then(e => {
    console.log("Build done!");
});