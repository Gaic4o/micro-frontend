require('esbuild').build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true, // 이것을 하지 않으면 bundle 이 되지 않음.
    platform: "node",
    sourcemap: true,
    minify: true
})