const noUnusedVars = [
  "warn",
  { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
];

module.exports = {
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
  },
  extends: [
    "eslint:recommended",
    "plugin:@next/next/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  rules: {
    curly: ["warn", "multi-line", "consistent"],
    "no-unused-vars": noUnusedVars,
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "prettier/prettier": ["warn", { endOfLine: "auto" }],
    "import-alias/import-alias": [
      "error",
      {
        relativeDepth: 0,
        aliases: [
          { alias: "@components", matcher: "^components" },
          { alias: "@pages", matcher: "^pages" },
        ],
      },
    ],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "type",
        ],
        pathGroups: [{ pattern: "@/**", group: "internal" }],
        pathGroupsExcludedImportTypes: ["type"],
        "newlines-between": "always",
        alphabetize: {
          order:
            "asc" /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
      },
    ],
  },
  env: {
    browser: true,
    node: false,
    es2021: true,
  },
  globals: {
    __static: true,
  },
  overrides: [
    {
      files: ["*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      extends: ["plugin:@typescript-eslint/recommended"],
      settings: {
        "import/resolver": { typescript: { project: "./tsconfig.json" } },
      },
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": noUnusedVars,
        "@typescript-eslint/consistent-type-imports": "error",
      },
    },
    {
      files: ["./components/**/*", "./pages/**/*"],
      env: { browser: true },
      extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
      rules: {
        "react-hooks/exhaustive-deps": "error",
        "react/prop-types": "off",
      },
    },
  ],
};
