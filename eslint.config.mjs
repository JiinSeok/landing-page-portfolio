import { defineConfig, globalIgnores } from 'eslint/config'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  globalIgnores([
    '.next/**',
    'node_modules/**',
    'public/**',
    '.remember/**',
    '**/*.min.js',
    'next-env.d.ts',
  ]),
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    settings: {
      react: {
        version: '19.2',
      },
    },
    rules: {
      semi: ['warn', 'never'],
      'react-hooks/set-state-in-effect': 'warn',
      'react/jsx-key': 'error',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])
