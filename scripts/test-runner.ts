const { execSync } = require('child_process');

/**
 * @function parseArgs
 * @description Parses command line arguments and returns a map of flags and values.
 * @returns {Record<string, string | boolean>} - Map of flags and values
 */
function parseArgs() {
    const args = process.argv.slice(2);
    const config: Record<string, string | boolean> = {
        browser: '',
        grep: '',
        headed: false,
        allure: true,
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--browser' && args[i + 1]) {
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
 * @function main
 * @description Main execution function
 */
function main() {
    const config = parseArgs();

    // 1. Clean Allure if enabled
    if (config.allure) {
        console.log('🧹 Cleaning Allure reports...');
        try {
            execSync('npm run clean:allure', { stdio: 'inherit' });
        } catch (error) {
            console.warn('Warning: Failed to clean allure reports, continuing...');
        }
    }

    // 2. Build Playwright Command
    let cmd = 'playwright test --config config/playwright.config.ts';

    if (config.browser) {
        // Playwright test uses BROWSER env var or --project flag usually, 
        // but for this project setup which seems to use BROWSER env in scripts:
        process.env.BROWSER = config.browser as string;
        console.log(`🌐 Setting browser to: ${config.browser}`);
    }

    if (config.grep) {
        cmd += ` --grep "${config.grep}"`;
    }

    if (config.headed) {
        cmd += ' --headed';
    }

    console.log(`🚀 Running: ${cmd}`);

    // 3. Run Tests
    let testSuccess = true;
    try {
        execSync(cmd, { stdio: 'inherit', env: process.env });
    } catch (error) {
        testSuccess = false;
        console.error('❌ Tests failed.');
    }

    // 4. Generate Allure Report if enabled
    if (config.allure) {
        console.log('📊 Generating Allure report...');
        try {
            execSync('npm run allure:generate', { stdio: 'inherit' });
        } catch (error) {
            console.error('❌ Failed to generate Allure report.');
        }
    }

    if (!testSuccess) {
        process.exit(1);
    }
}

main();
