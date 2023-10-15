import terser from '@rollup/plugin-terser'
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import buble from "@rollup/plugin-buble";

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/index.es.js',
            format: 'esm'
        },
        {
            file: 'dist/index.cjs.min.js',
            format: 'cjs',
            plugins: terser()
        },
        {
            file: 'dist/index.es.min.js',
            format: 'esm',
            plugins: terser()
        }
    ],
    plugins: [
        resolve(),
        typescript(),
        buble()
    ]
};