/// <references lib="@types/node" />
import * as esbuild from "esbuild";
import { copy, pathExists, emptyDir } from "fs-extra";
import { resolve, join } from 'path';

const cleanPlugin = {
    name: "clean build",

    setup(build) {
        build.onStart(async () => {
            console.clear();
            const buildDir = resolve(build.initialOptions.outdir, '../');
            if (await pathExists(buildDir))
                await emptyDir(buildDir);


            await copy(resolve("index.html"), join(buildDir, "index.html"));

            await copy(resolve("./assets"), join(buildDir, "./assets"));
        });
    }
};

esbuild.build({
    entryPoints: [
        'src/Runtime/index.ts',
        'src/Game/main.ts',
    ],
    outdir: "./dist/scripts",
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
