import { faker } from '@faker-js/faker';
import { AccountInfo } from './interfaces';
import * as fs from 'fs';
import * as path from 'path';

/**
 * @function selectRandomProduct
 * @description Select a random product from the list of product names
 * @param {string[]} productListNames - List of product names
 * @returns {string} Random product name
 */
export function selectRandomProduct(productListNames: string[]): string {
  const randomIndex = Math.floor(Math.random() * productListNames.length);
  return productListNames[randomIndex];
}

/**
 * @function cartAddRandomProduct
 * @description Select a random product from the list of product names
 * @param {string[]} productListNames - List of product names
 * @returns {string} Random product name
 */
export function cartAddRandomProduct(productListNames: string[]): string {
  const randomIndex = Math.floor(Math.random() * productListNames.length);
  return productListNames[randomIndex];
}

/**
 * @function generateNewAccountInfo
 * @description Generate a new account information using Faker.js
 * @returns {AccountInfo} New account information
 */
export function generateNewAccountInfo(): AccountInfo {
  const currentYear = new Date().getFullYear();
  const maxBirthYear = currentYear - 21;
  const minBirthYear = currentYear - 80;
  const birthYear = faker.date.between({ from: new Date(minBirthYear, 0, 1), to: new Date(maxBirthYear, 11, 31) });
  const gender = faker.person.sex();

  return {
    gender: gender,
    first_name: faker.person.firstName(gender as 'male' | 'female'),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12, memorable: false, pattern: /[A-Za-z0-9!@#$%]/ }),
    day_birth: birthYear.getDate().toString(),
    month_birth: (birthYear.getMonth() + 1).toString(),
    year_birth: birthYear.getFullYear().toString(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    country: 'United States',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile_phone: faker.phone.number()
  };
}

/**
 * @function saveUserCredentials
 * @description Save user credentials (email and password) to a file
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {void}
 */
export function saveUserCredentials(email: string, password: string): void {
  const credentialsDir = path.join(process.cwd(), 'src/data');
  const credentialsFile = path.join(credentialsDir, 'user-credentials.txt');
  if (!fs.existsSync(credentialsDir)) {
    fs.mkdirSync(credentialsDir, { recursive: true });
  }
  const timestamp = new Date().toISOString();
  const credentialEntry = `\n${'='.repeat(60)}\n` +
    `Created: ${timestamp}\n` +
    `Email: ${email}\n` +
    `Password: ${password}\n` +
    `${'='.repeat(60)}\n`;
  fs.appendFileSync(credentialsFile, credentialEntry, 'utf8');
  console.log(`✅ Credentials saved to: ${credentialsFile}`);
}

