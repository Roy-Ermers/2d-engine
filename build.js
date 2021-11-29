/// <references lib="@types/node" />
import * as esbuild from "esbuild";
import { copy, pathExists, emptyDir } from "fs-extra";
import { resolve, join } from 'path';

const DEV = process.env.NODE_ENV != 'production';

const finishedHooks = [];

/**
 * @type {esbuild.Plugin}
 */
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

        build.onEnd(result => {
            if (result.errors.length > 0)
                return;

            finishedHooks.forEach(x => x());
        })
    }
};

function build() {
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
        watch: DEV,
        logLevel: "info",
        plugins: [cleanPlugin]
    }).catch(process.exit).then(e => {
        console.log("Build done!");
    });
}

async function startServer() {
    const { default: http } = await import("http");
    const { default: connect } = await import("connect");
    const { default: middleware } = await import("middleware-static-livereload");
    const app = connect();
    app.use(middleware.middleware({
        documentRoot: resolve("./dist/"),
        logLevel: 3,
        watch: {
            interval: 300,
            awaitWriteFinish: {
                pollInterval: 100,
                stabilityThreshold: 1000
            }
        }
    }));

    http.createServer(app).listen(8080);
    console.log("Live server started.");
}

build();

if (DEV) {
    startServer();
}
