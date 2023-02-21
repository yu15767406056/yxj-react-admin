/* eslint-disable */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'react-app', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    '@typescript-eslint/triple-slash-reference': 'warn',
    '@typescript-eslint/no-var-requires': 2,
    'react-hooks/exhaustive-deps': 0,
    'prettier/prettier': 1,
    '@typescript-eslint/no-unused-vars': 1,
    'no-unused-vars': 1,
    'import/no-commonjs': 0,
  },
}
