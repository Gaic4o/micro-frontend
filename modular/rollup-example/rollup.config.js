import commonjs from '@rollup/plugin-commonjs';
import {babel} from '@rollup/plugin-babel';

export default {
    input: 'src/main.js',
    output: [{
        file: 'dist/bundle.cjs.js',
        format: 'cjs'
    }, {
        file: 'dist/bundle.esm.js',
        format: 'esm'
    }, {
        file: 'dist/bundle.iife.js',
        format: 'iife',
        name: 'MyLibrary'
    }],
    plugins: [
        commonjs(),
        babel({babelHelpers: 'bundled'})
    ],
};
