module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['deprecate', 'simple-import-sort', 'import'],
  rules: {
    curly: ['error'],
    complexity: ['error', { max: 9 }],
    'jsx-quotes': ['error', 'prefer-double'],
    'no-nested-ternary': 'warn',
    semi: ['error', 'never'],
    'deprecate/function': [
      'warn',
      { name: 'map', use: 'array?.map' },
      { name: 'filter', use: 'array?.filter' },
    ],
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { destructuredArrayIgnorePattern: '^_' },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        // Define groups for sorting
        groups: [
          // Group 1: `react` imports, then packages (node_modules)
          ['^react', '^@?\\w'],
          // Group 2: Side effect imports
          ['^\\u0000'],
          // Group 3: Parent imports (..), then other relative imports (.), then styles and images
          [
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
          // Group 4: Style imports
          ['^.+\\.s?css$'],
          // Group 5: Image imports
          ['^.+\\.(png|svg|jpe?g)'],
        ],
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-restricted-imports': ['error'],
    'linebreak-style': 'off',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
      },
    },
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    analytics: 'readonly',
  },
}
