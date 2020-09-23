import resolve       from '@rollup/plugin-node-resolve';
import commonjs      from '@rollup/plugin-commonjs';
import copy          from 'rollup-plugin-copy';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { terser }    from 'rollup-plugin-terser';

export default {

    context: 'window',

    external: [],

    input: 'src/parser.js',

    output: [

        // ES Module
        {

            format   : 'esm',
            file     : 'dist/parser.esm.js',
            sourcemap: false,
            globals  : {}

        },

        // Minfied browser export
        {

            format   : 'iife',
            name     : 'dotObjectParser',
            file     : 'dist/parser.min.js',
            sourcemap: true,
            globals  : {},
            plugins  : [ terser () ]

        }

    ],

    plugins: [

        resolve (),
        commonjs (),
        nodePolyfills (),

        // CommonJS export
        copy (
            {
                targets: [
                    { src: 'src/parser.js', dest: 'dist/' }
                ]
            }
        )

    ]

};