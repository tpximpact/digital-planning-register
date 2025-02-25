- [x] Update eslint configuration file to include a11y and next/typescript linting

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

./src/components/ApplicationProgressInfo/ApplicationProgressInfoSection.tsx
53:7 Error: Visible, non-interactive elements with click handlers must have at least one keyboard listener. jsx-a11y/click-events-have-key-events
53:7 Error: Avoid non-native interactive elements. If using native HTML is not possible, add an appropriate role and support for tabbing, mouse, keyboard, and touch inputs to an interactive content element. jsx-a11y/no-static-element-interactions

./src/components/CommentCard/CommentCard.tsx
90:11 Error: Visible, non-interactive elements with click handlers must have at least one keyboard listener. jsx-a11y/click-events-have-key-events
90:11 Error: Avoid non-native interactive elements. If using native HTML is not possible, add an appropriate role and support for tabbing, mouse, keyboard, and touch inputs to an interactive content element. jsx-a11y/no-static-element-interactions
