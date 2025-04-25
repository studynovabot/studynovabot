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
    "@typescript-eslint/no-explicit-any": "off", // Turn off no-explicit-any
    "prefer-const": "warn", // Downgrade to warning
    "no-useless-escape": "warn", // Downgrade to warning
    "react-hooks/exhaustive-deps": "warn", // Downgrade to warning
    "@next/next/no-img-element": "warn" // Downgrade to warning
  },
};