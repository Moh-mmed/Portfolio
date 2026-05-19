import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";

const config = [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    ignores: [
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "dist/**",
      "build/**",
      "playwright-report/**",
      "test-results/**"
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      "no-console": "off"
    }
  },
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='img']",
          message: "Use next/image for production imagery instead of img."
        }
      ]
    }
  },
  {
    files: ["lib/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSAnyKeyword",
          message: "Avoid any in production code."
        }
      ]
    }
  },
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
    rules: {
      "no-warning-comments": ["error", { terms: ["todo", "fixme"], location: "start" }]
    }
  },
  {
    files: ["tests/**/*.{ts,tsx}", "playwright.config.ts"],
    rules: {
      "no-restricted-globals": "off"
    }
  },
  {
    ignores: [
      "public/**",
      "assets/**",
      "docs/**",
      "specs/**"
    ]
  }
];

export default config;
