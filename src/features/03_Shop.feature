@web @checkout @shop
Feature: Shop Management - Automation Excercise
    As a registered user
    The browser should allow the user to shop products
    So that the user can purchase items

  Background:
    Given The user register new account and logins with valid authentication

  Scenario: 01 - Shop Products with search
    When the user navigates to the products section
    And the browser should display the list of available products
    And the user searches for a product and add to cart random one
      | Product |
      | White   |
      | Dress   |
      | Tshirt  |
    And the user proceed to checkout and verify total amount and products
    And the user placer order with credit card
