// @ts-check
import { fileURLToPath } from 'url';
import * as path from 'path';
import eslint from '@eslint/js';
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from 'typescript-eslint';
import { fixupPluginRules } from "@eslint/compat";
import stylistic from '@stylistic/eslint-plugin-ts';

const project = "./tsconfig.json";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
    baseDirectory: dirname,
    recommendedConfig: eslint.configs.recommended,
});

function legacyPlugin(name, alias = name) {
    const plugin = compat.plugins(name)[0]?.plugins?.[alias];

    if (!plugin) {
        throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
    }

    return fixupPluginRules(plugin);
}

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("plugin:import/typescript"),
  {
      languageOptions: {
          parserOptions: {
              project,
              tsconfigRootDir: import.meta.dirname,
          },
      },
      settings: {
          "import/resolver": {
              typescript: {
                  alwaysTryTypes: true,
                  project,
              }
          },
      },
      plugins: {
          import: legacyPlugin("eslint-plugin-import", "import"),
          stylistic: stylistic,
      },
  },
  ...compat.extends("plugin:@next/next/recommended"),
  {
    "rules": {
      "no-var": "warn",
      "object-shorthand": ["warn", "properties"],

      "accessor-pairs": ["error", { "setWithoutGet": true, "enforceForClassMembers": true }],
      "array-bracket-spacing": ["error", "never"],
      "array-callback-return": ["error", {
        "allowImplicit": false,
        "checkForEach": false
      }],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "block-spacing": ["error", "always"],
      "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "camelcase": ["error", {
        "allow": ["^UNSAFE_"],
        "properties": "never",
        "ignoreGlobals": true
      }],
      "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "always-multiline",
        "imports": "never",
        "exports": "never",
        "functions": "never",
      }],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "comma-style": ["error", "last"],
      "computed-property-spacing": ["error", "never", { "enforceForClassMembers": true }],
      "curly": ["error", "multi-line"],
      "default-case-last": "error",
      "dot-location": ["error", "property"],
      "dot-notation": ["error", { "allowKeywords": true }],
      "eol-last": "error",
      "eqeqeq": ["error", "always", { "null": "ignore" }],
      "func-call-spacing": ["error", "never"],
      "generator-star-spacing": ["error", { "before": true, "after": true }],
      "indent": ["error", 2],
      "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "lines-between-class-members": ["error", "always"],
      "multiline-ternary": ["error", "always-multiline"],
      "new-cap": ["error", { "newIsCap": true, "capIsNew": false, "properties": true }],
      "new-parens": "error",
      "no-caller": "error",
      "no-constant-condition": ["error", { "checkLoops": false }],
      "no-empty": ["error", { "allowEmptyCatch": true }],
      "no-eval": "error",
      "no-extend-native": "error",
      "no-extra-bind": "error",
      "no-extra-parens": ["error", "functions"],
      "no-floating-decimal": "error",
      "no-iterator": "error",
      "no-labels": ["error", { "allowLoop": false, "allowSwitch": false }],
      "no-lone-blocks": "error",
      "no-useless-catch": "error",
      "no-mixed-operators": ["error", {
        "groups": [
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"]
        ],
        "allowSamePrecedence": true
      }],
      "no-mixed-spaces-and-tabs": "error",
      "no-multi-spaces": "error",
      "no-multi-str": "error",
      "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 0 }],
      "no-new": "error",
      "no-new-func": "error",
      "no-new-object": "error",
      "no-new-symbol": "error",
      "no-new-wrappers": "error",
      "no-octal-escape": "error",
      "no-proto": "error",
      "no-redeclare": ["error", { "builtinGlobals": false }],
      "no-return-assign": ["error", "except-parens"],
      "no-self-assign": ["error", { "props": true }],
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-tabs": "error",
      "no-template-curly-in-string": "error",
      "no-trailing-spaces": "error",
      "no-undef-init": "error",
      "no-unmodified-loop-condition": "error",
      "no-unneeded-ternary": ["error", { "defaultAssignment": false }],
      "no-unreachable-loop": "error",
      "no-unused-expressions": ["error", {
        "allowShortCircuit": true,
        "allowTernary": true,
        "allowTaggedTemplates": true
      }],
      "no-useless-call": "error",
      "no-useless-computed-key": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-void": "error",
      "no-whitespace-before-property": "error",
      "object-curly-newline": ["error", { "multiline": true, "consistent": true }],
      "object-curly-spacing": ["error", "always"],
      "object-property-newline": ["error", { "allowMultiplePropertiesPerLine": true }],
      "one-var": ["error", { "initialized": "never" }],
      "operator-linebreak": ["error", "after", { "overrides": { "?": "before", ":": "before", "|>": "before" } }],
      "padded-blocks": ["error", { "blocks": "never", "switches": "never", "classes": "never" }],
      "prefer-const": ["error", { "destructuring": "all" }],
      "prefer-regex-literals": ["error", { "disallowRedundantWrapping": true }],
      "quote-props": ["error", "as-needed"],
      "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": false }],
      "rest-spread-spacing": ["error", "never"],
      "semi": ["error", "always"],
      "semi-spacing": ["error", { "before": false, "after": true }],
      "space-before-blocks": ["error", "always"],
      "space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always",
      }],
      "space-in-parens": ["error", "never"],
      "space-infix-ops": "error",
      "space-unary-ops": ["error", { "words": true, "nonwords": false }],
      "spaced-comment": ["error", "always", {
        "line": { "markers": ["*package", "!", "/", ",", "="] },
        "block": { "balanced": true, "markers": ["*package", "!", ",", ":", "::", "flow-include"], "exceptions": ["*"] }
      }],
      "symbol-description": "error",
      "template-curly-spacing": ["error", "never"],
      "template-tag-spacing": ["error", "never"],
      "unicode-bom": ["error", "never"],
      "use-isnan": ["error", {
        "enforceForSwitchCase": true,
        "enforceForIndexOf": true
      }],
      "valid-typeof": ["error", { "requireStringLiterals": true }],
      "wrap-iife": ["error", "any", { "functionPrototypeMethods": true }],
      "yield-star-spacing": ["error", "both"],
      "yoda": ["error", "never"],

      "import/export": "error",
      "import/first": "error",
      "import/no-absolute-path": ["error", { "esmodule": true, "commonjs": true, "amd": false }],
      "import/no-duplicates": "error",
      "import/no-named-default": "error",
      "import/no-webpack-loader-syntax": "error",
      "stylistic/type-annotation-spacing": ["error", {
        "before": false,
        "after": true,
        "overrides": {
          "arrow": { "before": true, "after": true },
        }
      }],
    }
  }
);