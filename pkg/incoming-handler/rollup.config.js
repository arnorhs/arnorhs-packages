import typescript from 'rollup-plugin-ts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import packageJson from './package.json'

const plugins = [resolve({ preferBuiltins: true }), commonjs()]

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
    plugins: [
      ...plugins,
      typescript({
        tsconfig: {
          ...require('./tsconfig.json').compilerOptions,
          module: 'ESNext',
          declaration: true,
          declarationDir: 'dist',
        },
      }),
    ],
  },
  ...[
    ['NodeHttpAdapter', 'node'],
    ['WorkersAdapter', 'workers'],
    ['LambdaAdapter', 'lambda'],
  ].map(([directory, targetFile]) => ({
    input: `./src/adapters/${directory}/index.ts`,
    output: [
      {
        file: `dist/adapters/${targetFile}.cjs`,
        format: `cjs`,
      },
      {
        file: `dist/adapters/${targetFile}.esm.js`,
        format: `esm`,
      },
    ],
    external,
    plugins: [
      ...plugins,
      typescript({
        tsconfig: {
          ...require('./tsconfig.json').compilerOptions,
          module: 'ESNext',
          declaration: true,
          declarationDir: 'dist/adapters',
        },
      }),
    ],
  })),
]
