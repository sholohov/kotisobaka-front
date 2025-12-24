import withNuxt from './.nuxt/eslint.config.mjs'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

export default withNuxt(
  ...pluginVue.configs['flat/strongly-recommended'],

  {
    plugins: { stylistic },

    rules: {
      'padding-line-between-statements': [
        'error',

        // Переменные
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'never',  prev: ['singleline-const', 'singleline-let', 'singleline-var'], next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: ['multiline-const', 'multiline-let', 'multiline-var'],    next: ['const', 'let', 'var'] },

        // Перед функциями/блоками/return
        { blankLine: 'always', prev: '*', next: ['function', 'block-like', 'return'] },
        { blankLine: 'never',  prev: 'return', next: 'return' },
      ],

      // Стиль
      'stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'stylistic/indent': ['error', 2],
      'stylistic/keyword-spacing': ['error', { before: true, after: true }],
      'stylistic/eol-last': ['error', 'always'],
      'stylistic/no-trailing-spaces': 'error',
      'stylistic/comma-dangle': ['error', 'always-multiline'],
      'stylistic/object-curly-spacing': ['error', 'always'],
      'stylistic/array-bracket-spacing': ['error', 'never'],
      'stylistic/space-infix-ops': 'error',
      'stylistic/quote-props': ['error', 'as-needed'],
      'stylistic/space-before-blocks': ['error', 'always'],

      // Пробел перед скобками у функций (включая async-стрелочные)
      'stylistic/space-before-function-paren': [
        'error',
        { anonymous: 'always', named: 'never', asyncArrow: 'always' },
      ],

      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      'vue/no-multiple-template-root': 'off',
    },
  },

  // Разрешаем однословные имена для Nuxt-страниц/лейаутов
  {
    files: ['app/layouts/*.vue', 'app/pages/**/*.vue'],
    rules: { 'vue/multi-word-component-names': 'off' },
  },
)
