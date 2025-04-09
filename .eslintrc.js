module.exports = {
  plugins: [
    // plugins provide additional rules or processors that we can access
    "prettier",
    "check-file",
  ],
  extends: [
    // extends is used to inherit predefined configurations or shareable ESLint configurations.
    // These configurations can include rules, plugins, and settings.
    // rules at the end take precedence
    //
    // eslints recommended rules
    "eslint:recommended",
    // import all the rules from jsx-a11y
    "plugin:jsx-a11y/recommended",

    // apply recommended storybook rules to *.stories.* or *.story.* pattern.
    "plugin:storybook/recommended",

    // not advised to add anything below here
    //
    //
    // adding this allows prettier to be used with eslint by disabling any eslint rules that may conflict with prettier
    "plugin:prettier/recommended",
    // includes Next.js' base ESLint configuration along with a stricter Core Web Vitals rule-set.
    "next/core-web-vitals",
    // adds TypeScript-specific lint rules to your config:
    "next/typescript",
  ],
  ignorePatterns: [
    "node_modules/*",
    "generators/*",
    "/build/**",
    "/coverage/**",
    "/src/types/odp-types/**",
  ],
  rules: {
    // extend this rule to allow unused vars that are used to remove things from an object
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        ignoreRestSiblings: true,
      },
    ],
    "linebreak-style": ["error", "unix"],
    "@typescript-eslint/consistent-type-imports": "error",
    "import/no-absolute-path": "error",
    "import/no-useless-path-segments": "error",
    "import/newline-after-import": "error",
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/no-cycle": "warn",
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
  overrides: [
    // allows you to specify custom rules, settings, or configurations for specific files or file patterns.
  ],
};
