/// <references lib="@types/node" />
import * as esbuild from "esbuild";
import { rm, stat } from "fs/promises";
const fileExists = async path => !!(await stat(path).catch(() => false));
const cleanPlugin = {
    name: "clean build",

    setup(build) {
        build.onStart(async () => {
            if (await fileExists(build.initialOptions.outdir))
                await rm(build.initialOptions.outdir, { recursive: true });
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
    watch: true,
    logLevel: "info",
    plugins: [cleanPlugin]
}).catch(process.exit).then(e => {
    console.log("Build done!");
});