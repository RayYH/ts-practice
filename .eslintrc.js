module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    // disable warning: Unexpected any. Specify a different type
    "@typescript-eslint/no-explicit-any": 0,
    // allowed @ts-ignore
    "@typescript-eslint/ban-ts-ignore": 0,
    // allow require
    "@typescript-eslint/no-var-requires": 0,
    // object
    "@typescript-eslint/ban-types": 0
  },
};
