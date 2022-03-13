import typescript from 'rollup-plugin-ts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import packageJson from './package.json'

const plugins = [
  resolve({ preferBuiltins: true }),
  commonjs(),
  typescript({
    tsconfig: 'tsconfig.build.json',
  }),
]

const external = Object.keys(packageJson.dependencies ?? {})

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
      },
      {
        file: packageJson.module,
        format: 'esm',
      },
    ],
    external,
    plugins,
  },
  {
    input: './src/adapters/NodeHttpAdapter/index.ts',
    output: [
      {
        file: 'dist/adapters/node.js',
        format: 'cjs',
      },
      {
        file: 'dist/adapters/node.esm.js',
        format: 'esm',
      },
    ],
    external,
    plugins,
  },
  {
    input: './src/adapters/WorkersAdapter/index.ts',
    output: [
      {
        file: 'dist/adapters/workers.js',
        format: 'cjs',
      },
      {
        file: 'dist/adapters/workers.esm.js',
        format: 'esm',
      },
    ],
    external,
    plugins,
  },
  {
    input: './src/adapters/LambdaAdapter/index.ts',
    output: [
      {
        file: 'dist/adapters/lambda.js',
        format: 'cjs',
      },
      {
        file: 'dist/adapters/lambda.esm.js',
        format: 'esm',
      },
    ],
    external,
    plugins,
  },
]
