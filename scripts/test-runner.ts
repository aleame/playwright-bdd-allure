const { execSync } = require('child_process');

interface TestRunnerConfig {
    browser: string;
    grep: string;
    headed: boolean;
    allure: boolean;
    help: boolean;
}

const VALID_BROWSERS = ['chromium', 'firefox', 'webkit'] as const;
type Browser = typeof VALID_BROWSERS[number];

/**
 * @function displayHelp
 * @description Displays help information for the test runner
 * @returns {void}
 */
function displayHelp(): void {
    console.log(`
🛟 Playwright BDD Test Runner - Usage

Options:
  --browser <name>    Specify browser (chromium, firefox, webkit)
  --grep <pattern>    Run tests matching the pattern (e.g., @login)
  --headed            Run tests in headed mode (visible browser)
  --no-allure         Skip Allure report generation
  --help              Display this help message

Examples:
  npm run test:runner -- --grep @login
  npm run test:runner -- --browser firefox --headed
  npm run test:runner -- --grep @products --no-allure
    `);
}

/**
 * @function validateBrowser
 * @description Validates browser name against supported browsers
 * @param {string} browser - Browser name to validate
 * @returns {boolean} - True if browser is valid, false otherwise
 */
function validateBrowser(browser: string): boolean {
    return VALID_BROWSERS.includes(browser as Browser);
}

/**
 * @function parseArgs
 * @description Parses command line arguments and returns configuration object
 * @returns {TestRunnerConfig} - Configuration object
 */
function parseArgs(): TestRunnerConfig {
    const args = process.argv.slice(2);
    const config: TestRunnerConfig = {
        browser: '',
        grep: '',
        headed: false,
        allure: true,
        help: false,
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--help' || arg === '-h') {
            config.help = true;
        } else if (arg === '--browser' && args[i + 1]) {
            config.browser = args[i + 1];
            i++;
        } else if (arg === '--grep' && args[i + 1]) {
            config.grep = args[i + 1];
            i++;
        } else if (arg === '--headed') {
            config.headed = true;
        } else if (arg === '--no-allure') {
            config.allure = false;
        }
    }
    return config;
}

/**
 * @function buildPlaywrightCommand
 * @description Builds the Playwright test command based on configuration
 * @param {TestRunnerConfig} config - Configuration object
 * @returns {string} - Playwright test command
 */
function buildPlaywrightCommand(config: TestRunnerConfig): string {
    let cmd = 'playwright test --config config/playwright.config.ts';

    if (config.browser) {
        process.env.BROWSER = config.browser;
        console.log(`🌐 Browser: ${config.browser}`);
    }

    if (config.grep) {
        cmd += ` --grep "${config.grep}"`;
        console.log(`🔍 Filter: ${config.grep}`);
    }

    if (config.headed) {
        cmd += ' --headed';
        console.log('👁️  Mode: headed');
    }

    return cmd;
}

/**
 * @function executeCommand
 * @description Executes a command and returns success status
 * @param {string} command - Command to execute
 * @param {string} description - Description of the command
 * @returns {boolean} - Success status
 */
function executeCommand(command: string, description: string): boolean {
    try {
        execSync(command, { stdio: 'inherit', env: process.env });
        return true;
    } catch (error) {
        console.error(`❌ ${description} failed.`);
        return false;
    }
}

/**
 * @function main
 * @description Main execution function
 * @returns {void}
 */
function main(): void {
    const config = parseArgs();

    // Display help if requested
    if (config.help) {
        displayHelp();
        process.exit(0);
    }

    // Validate browser if specified
    if (config.browser && !validateBrowser(config.browser)) {
        console.error(`❌ Invalid browser: "${config.browser}"`);
        console.error(`   Valid options: ${VALID_BROWSERS.join(', ')}`);
        process.exit(1);
    }

    console.log('\n🎭 Playwright BDD Test Runner\n');

    // 1. Clean Allure reports if enabled
    if (config.allure) {
        console.log('🧹 Cleaning Allure reports...');
        try {
            execSync('npm run clean:allure', { stdio: 'inherit' });
        } catch (error) {
            console.warn('⚠️  Warning: Failed to clean Allure reports, continuing...\n');
        }
    }

    // 2. Build and display Playwright command
    const cmd = buildPlaywrightCommand(config);
    console.log(`\n🚀 Running tests...\n`);

    // 3. Execute tests
    const testSuccess = executeCommand(cmd, 'Test execution');

    // 4. Generate Allure report if enabled
    if (config.allure) {
        console.log('\n📊 Generating Allure report...');
        executeCommand('npm run allure:generate', 'Allure report generation');
    }

    // 5. Exit with appropriate code
    if (!testSuccess) {
        console.log('\n❌ Tests failed. See output above for details.\n');
        process.exit(1);
    } else {
        console.log('\n✅ All tests completed successfully!\n');
    }
}

main();
