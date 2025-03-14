module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  ignorePatterns: [
    "node_modules/*",
    "public/mockServiceWorker.js",
    "generators/*",
    "/build/**",
    "/coverage/**",
    "/src/types/odp-types/**",
  ],
  extends: [
    "eslint:recommended",
    "plugin:storybook/recommended",
    "plugin:jsx-a11y/recommended",
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
  ],
  plugins: ["prettier", "jsx-a11y"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        ignoreRestSiblings: true,
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      settings: {
        react: { version: "detect" },
        "import/resolver": {
          typescript: {},
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      rules: {
        "linebreak-style": ["error", "unix"],
        "@typescript-eslint/consistent-type-imports": "error",
        "import/no-absolute-path": "error",
        "import/no-useless-path-segments": "error",
        "import/newline-after-import": "error",
        "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
        "import/no-cycle": "warn",
        // "import/order": [
        //   "error",
        //   {
        //     groups: [
        //       "builtin",
        //       "external",
        //       "internal",
        //       "parent",
        //       "sibling",
        //       "index",
        //       "object",
        //       "type",
        //     ],
        //     pathGroups: [
        //       {
        //         // Minimatch pattern used to match against specifiers
        //         pattern: "@/types/**",
        //         // The predefined group this PathGroup is defined in relation to
        //         group: "type",
        //         // How matching imports will be positioned relative to "group"
        //         position: "after",
        //       },
        //       {
        //         // Minimatch pattern used to match against specifiers
        //         pattern: "@/config/types/**",
        //         // The predefined group this PathGroup is defined in relation to
        //         group: "type",
        //         // How matching imports will be positioned relative to "group"
        //         position: "after",
        //       },
        //       {
        //         // Minimatch pattern used to match against specifiers
        //         pattern: "@/**",
        //         // The predefined group this PathGroup is defined in relation to
        //         group: "internal",
        //         // How matching imports will be positioned relative to "group"
        //         // position: "after",
        //       },
        //       {
        //         // Minimatch pattern used to match against specifiers
        //         pattern: "@mocks/**",
        //         // The predefined group this PathGroup is defined in relation to
        //         group: "internal",
        //         // How matching imports will be positioned relative to "group"
        //         // position: "after",
        //       },
        //     ],
        //     "newlines-between": "always",
        //     alphabetize: { order: "asc", caseInsensitive: true },
        //   },
        // ],
      },
    },
    // @todo npm install --save-dev eslint-plugin-check-file
    // {
    //   plugins: ["check-file"],
    //   files: ["src/**/*"],
    //   rules: {
    //     "check-file/filename-naming-convention": [
    //       "error",
    //       {
    //         "**/*.{ts,tsx}": "KEBAB_CASE",
    //       },
    //       {
    //         ignoreMiddleExtensions: true,
    //       },
    //     ],
    //     "check-file/folder-naming-convention": [
    //       "error",
    //       {
    //         "!(src/app)/**/*": "KEBAB_CASE",
    //         "!(src/components)/**/*": "KEBAB_CASE",
    //         "!(**/__tests__)/**/*": "KEBAB_CASE",
    //       },
    //     ],
    //   },
    // },
  ],
};
