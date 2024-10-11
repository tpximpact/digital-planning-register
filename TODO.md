- [ ] Update eslint configuration file to include a11y and next/typescript linting

```json
{
  "extends": [
    "plugin:jsx-a11y/recommended",
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ],
  "plugins": ["prettier", "jsx-a11y"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```
