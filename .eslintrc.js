module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // https://eslint.org/docs/rules/comma-dangle
    'comma-dangle': ['error', 'only-multiline'],
    // https://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' },
    ],

    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'vue/no-mutating-props': 'off',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
