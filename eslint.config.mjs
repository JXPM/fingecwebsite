import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Règles existantes
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "jsx-a11y/alt-text": "off",
      
      // Nouvelles règles pour résoudre les erreurs actuelles
      "@typescript-eslint/no-explicit-any": "warn", // ou "error" si vous voulez être strict
      "prefer-const": "error",
      "@next/next/no-html-link-for-pages": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // Règles supplémentaires recommandées
      "@typescript-eslint/explicit-function-return-type": "off",
      "react/react-in-jsx-scope": "off"
    },
  },
];

export default eslintConfig;