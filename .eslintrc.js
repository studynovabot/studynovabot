module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "off", // Allow console statements
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { vars: "all", args: "none", ignoreRestSiblings: true },
    ], // Ignore unused arguments and rest siblings
  },
};