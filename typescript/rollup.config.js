import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import filesize from 'rollup-plugin-filesize';
import { visualizer } from 'rollup-plugin-visualizer';

const config = [
  // ES Module build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: false,
    },
    plugins: [
      nodeResolve({
        preferBuiltins: true,
        exportConditions: ['es2022', 'es2020', 'es2015', 'node'],
      }),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false,
        sourceMap: false,
        importHelpers: false,
        exclude: ['**/*.test.ts', '**/*.spec.ts'],
      }),
      filesize(),
      terser(),
      visualizer({
        filename: 'stats.html',
        open: true,
      }),
    ],
    external: (id) => {
      // Mark all node built-ins as external
      return /^node:/.test(id) || ['fs', 'path', 'url', 'util', 'crypto', 'http', 'https', 'stream'].includes(id);
    },
  },
  // CommonJS build for Node.js compatibility
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: false,
      exports: 'named',
    },
    plugins: [
      nodeResolve({
        preferBuiltins: true,
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: false,
        importHelpers: false,
      }),
    ],
    external: (id) => {
      return /^node:/.test(id) || ['fs', 'path', 'url', 'util', 'crypto', 'http', 'https', 'stream'].includes(id);
    },
  },
  // Minified ES Module build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.min.js',
      format: 'es',
      sourcemap: false,
    },
    plugins: [
      nodeResolve({
        preferBuiltins: true,
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: false,
        importHelpers: false,
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.debug'],
          passes: 2,
        },
        mangle: {
          toplevel: true,
        },
        format: {
          comments: false,
        },
      }),
    ],
    external: (id) => {
      return /^node:/.test(id) || ['fs', 'path', 'url', 'util', 'crypto', 'http', 'https', 'stream'].includes(id);
    },
  },
  // Type definitions
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];

export default config;
