import typescript from 'rollup-plugin-ts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import packageJson from './package.json'
import del from 'rollup-plugin-delete'

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
      del({ targets: 'dist/*' }),
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
        file: `dist/adapters/${targetFile}/index.cjs`,
        format: `cjs`,
      },
      {
        file: `dist/adapters/${targetFile}/index.js`,
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
          declarationDir: `dist/adapters/${targetFile}`,
        },
      }),
    ],
  })),
]
