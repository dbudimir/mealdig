module.exports = {
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-empty-object-type': 'warn',
    '@typescript-eslint/no-unsafe-function-type': 'warn',
    'prefer-const': 'warn',
    'react/no-unescaped-entities': 'warn',
    '@next/next/no-html-link-for-pages': 'warn',
    '@next/next/no-img-element': 'warn',
    'react/jsx-key': 'warn',
    'react/no-string-refs': 'warn',
  },
};
