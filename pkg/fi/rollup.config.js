import typescript from 'rollup-plugin-ts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import packageJson from './package.json'

export default {
  input: './src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: false,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: false,
    },
  ],
  external: Object.keys(packageJson.dependencies ?? {}),
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.build.json',
    }),
  ],
}
