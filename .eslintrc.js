module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
    },
};
