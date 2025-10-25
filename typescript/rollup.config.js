import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

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
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: false,
        importHelpers: false,
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
