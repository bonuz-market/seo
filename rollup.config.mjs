import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

export default [
  {
    input: `src/index.ts`,
    plugins: [
      esbuild({
        minify: true,
      }),
    ],
    output: [
      {
        file: `dist/index.js`,
        format: 'cjs',
      },
      {
        file: `dist/index.mjs`,
        format: 'es',
      },
    ],
  },

  {
    input: `src/index.ts`,
    plugins: [dts()],
    output: {
      file: `dist/index.d.ts`,
      format: 'es',
    },
  },
]
