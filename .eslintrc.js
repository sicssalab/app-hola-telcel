module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  rules: {
    "no-unused-vars": 1,
    // quotes: 0,
    // "no-console": 1,
    // "no-debugger": 1,
    // "no-var": 1,
    // semi: [1, "always"],
    // "no-trailing-spaces": 0,
    // "eol-last": 0,
    // "no-underscore-dangle": 0,
    // "no-alert": 0,
    // "no-lone-blocks": 0,
    // "jsx-quotes": 1,
    // "react/display-name": [1, { ignoreTranspilerName: false }],
    // "react/forbid-prop-types": [1, { forbid: ["any"] }],
    // "react/jsx-boolean-value": 1,
    // "react/jsx-closing-bracket-location": 0,
    // "react/jsx-indent-props": 0,
    // "react/jsx-key": 1,
    // "react/jsx-max-props-per-line": 0,
    // "react/jsx-no-bind": 0,
    // "react/jsx-no-duplicate-props": 1,
    // "react/jsx-no-literals": 0,
    // "react/jsx-no-undef": 1,
    // "react/jsx-pascal-case": 1,
    // "react/jsx-sort-prop-types": 0,
    // "react/jsx-sort-props": 0,
    // "react/jsx-uses-react": 1,
    // "react/jsx-uses-vars": 1,
    // "react/no-danger": 1,
    // "react/no-did-mount-set-state": 1,
    // "react/no-did-update-set-state": 1,
    // "react/no-direct-mutation-state": 1,
    // "react/no-multi-comp": 1,
    // "react/no-set-state": 0,
    // "react/no-unknown-property": 1,
    // "react/prefer-es6-class": 1,
    // "react/require-extension": 0,
    // "react/self-closing-comp": 1,
    // "react/sort-comp": 1,
    // "react/wrap-multilines": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
  },
};