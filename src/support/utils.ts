import { faker } from '@faker-js/faker';
import { AccountInfo } from './interfaces';

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
