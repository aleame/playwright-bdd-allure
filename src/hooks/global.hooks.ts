import { createBdd } from 'playwright-bdd';
import { test } from '@fixtures/pageFixtures';
import { parentSuite } from 'allure-js-commons';

const { Before } = createBdd(test);

Before(async ({ $testInfo }) => {
    // Extract Feature Name from the title path
    const featureName = $testInfo.titlePath[1];
    if (featureName) {
        parentSuite(featureName);
    }
});
