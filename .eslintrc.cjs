/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

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
      },
    },
    {
      plugins: ["check-file"],
      files: ["**/*"],
      rules: {
        "check-file/filename-naming-convention": [
          "error",
          {
            // types
            "**/*.d.ts": "CAMEL_CASE",

            // components
            "**/components/**/!(index.*)*": "PASCAL_CASE",

            // Public assets: kebab-case
            "public/**/*": "KEBAB_CASE",

            // Test files: camelCase
            "__tests__/{!(components),}/*.{ts,tsx,js,jsx}": "CAMEL_CASE",
            "__e2e__/**/*.{ts,tsx,js,jsx}": "CAMEL_CASE",
            "__mocks__/**/*.{ts,tsx,js,jsx}": "CAMEL_CASE",

            /**
             *
             * Kebab-case for app|styles
             * PascalCase for components
             * camelCase for functions
             *
             * actions - camelCase
             * app - Kebab-case
             * components - PascalCase
             * config - camelCase
             * handlers - camelCase
             * lib - camelCase
             * styles - Kebab-case
             * types - camelCase
             * util - camelCase
             */
            "src/{actions,config,handlers,lib,util}/**/*": "CAMEL_CASE",
            "src/{app,styles}/**/*": "KEBAB_CASE",
          },
          {
            ignoreMiddleExtensions: true, // Ignore middle extensions like .test.tsx
          },
        ],
        "check-file/folder-naming-convention": [
          "error",
          {
            // src/app|styles: kebab-case
            "src/styles/*": "KEBAB_CASE",

            // src/app|styles: kebab-case
            "src/app/*": "NEXT_JS_APP_ROUTER_CASE",

            // components
            "src/components/*": "PASCAL_CASE",

            // default to camel case
            "src/*": "CAMEL_CASE",
          },
        ],
      },
    },
  ],
};
