@web @login
Feature: User Authentication - Automation Excercise
    As a registered user
    The browser should allow the user to authenticate
    So that the user can access personalized features

  Background:
    Given The user has accessed the application homepage

  Scenario: 01 - Login User with correct email and password
    When the user navigates to the authentication section
    And the user provides valid authentication credentials
    Then the browser should display user mail account in homepage

  Scenario: 02 - Login User with incorrect email and password
    When the user navigates to the authentication section
    And the user provides invalid authentication credentials
    Then the browser should display an authentication error message

  @failuremail
  Scenario Outline: 03 - Login User with credentials "<credentials>"
    When the user navigates to the authentication section
    And the user provides "<credentials>" authentication credentials with email "<email>" and password "<password>"
    Then the browser should display a validation message on the "<field>" field

    Examples:
      | credentials              | email                | password      | field    |
      | empty email              |                      | wrongpassword | email    |
      | empty password           | failuremail@mail.com |               | password |
      | empty email and password |                      |               | email    |

  @logout
  Scenario: 04 - Logout User
    When the user navigates to the authentication section
    And the user provides valid authentication credentials
    And the browser should display user mail account in homepage
    When the user logs out from the application
    Then the browser should display the login page again
