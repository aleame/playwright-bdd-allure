@web @products
Feature: Products Management - Automation Excercise
    As a registered user
    The browser should allow the user to view products
    So that the user can browse available items

  Background:
    Given The user logins with valid authentication credentials

  Scenario: 01 - View All Products List and product Detail Page
    When the user navigates to the products section
    And the browser should display the list of available products
    And the user select the first product to view details
    Then the browser should display detailed information about the selected product

  Scenario Outline: 02 - Search for a Product by Name <productName>
    When the user navigates to the products section
    And the browser should display the list of available products
    And the user searches for a product with the name "<productName>"
    And the browser should display search results related to "<productName>"
    And the user select the product "<productName>" to view details

    Examples:
      | productName          |
      | Blue Top             |
      | Men Tshirt           |
      | Frozen Tops For Kids |

  Scenario Outline: 03 - Search Products by Brand <productBrand>
    When the user navigates to the products section
    And the browser should display the list of available products
    And the user select a product brand "<productBrand>"
    And the browser should display products list related to "<productBrand>"
    And the user select a random product from list to view details
    Then the browser should display detailed information about the selected product by brand "<productBrand>"

    Examples:
      | productBrand       |
      | Polo               |
      | H&M                |
      | Kookie Kids        |
      | Madame             |
      | Mast & Harbour     |
      | Babyhug            |
      | Allen Solly Junior |
      | Biba               |
