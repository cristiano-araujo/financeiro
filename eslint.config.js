import js from "@eslint/js";

export default [
  {
    ignores: [".next/**", "node_modules/**"],
  },

  js.configs.recommended,

  {
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },
  },
];