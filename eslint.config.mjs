import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default [
    // Ignore patterns
    {
        ignores: [
            'node_modules/**',
            'reports/**',
            '.features-gen/**',
            '**/*.feature',
            '*.config.js',
            '*.config.ts',
            '*.config.mjs',
            'playwright.config.ts',
            'package-lock.json',
            'dist/**',
            'build/**',
        ],
    },

    // Base JavaScript rules
    js.configs.recommended,

    // TypeScript configuration
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // TypeScript specific rules
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-non-null-assertion': 'warn',

            // General code quality rules
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'prefer-const': 'error',
            'no-var': 'error',
            'eqeqeq': ['error', 'always'],
            'curly': ['error', 'all'],
            'no-throw-literal': 'error',
            'prefer-template': 'warn',
            'no-duplicate-imports': 'error',
        },
    },

    // Playwright-specific configuration
    {
        files: ['**/*.spec.ts', '**/step-definitions/**/*.ts', '**/pages/**/*.ts'],
        ...playwright.configs['flat/recommended'],
        rules: {
            ...playwright.configs['flat/recommended'].rules,
            'playwright/expect-expect': 'off', // BDD steps may not have explicit expects
            'playwright/no-standalone-expect': 'off', // BDD step definitions use expect outside test blocks
            'playwright/no-conditional-in-test': 'warn',
            'playwright/no-skipped-test': 'warn',
            'playwright/no-wait-for-timeout': 'warn',
            'playwright/no-networkidle': 'warn', // Warn instead of error for deprecated networkidle
            'playwright/prefer-web-first-assertions': 'error',
        },
    },

    // Feature files and generated files - minimal linting
    {
        files: ['**/*.feature', '**/.features-gen/**'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },

    // Fixtures - allow empty object patterns
    {
        files: ['**/fixtures/**/*.ts'],
        rules: {
            'no-empty-pattern': 'off', // Playwright fixtures use empty destructuring
        },
    }
];
