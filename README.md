# Swang Lab Testing | Tests case version - 2.0.1 | Cypress version - 13.3.0

The tests written for the website: https://www.saucedemo.com/

![image](https://github.com/Lariw/swag-labs-testing/assets/98982966/56325a55-900b-4ac9-81cc-110e43956093)

:arrow_right: :hammer:   [View more on Github Actions](https://github.com/Lariw/swag-labs-testing/actions)


## Installation

To run the tests, you need to have Node.js installed, preferably in the latest version.
Navigate to the tests directory and open a console. Type npm install to install the necessary packages

```
npm install
```

or 

```
npm i
```

Next, type npx cypress open in the console to launch tests with the interface.

```
npx cypress open
```

## Headless mode

To run Cypress tests in headless mode, you need to enter the appropriate commands related to a specific test in the console.


| Command | description |
| ------ | ------ |
| npm run cypress:functionality | Functional Application Tests |
| npm run cypress:logging | Login Validation Tests |
| npm run cypress:runAllTests | Run all tests |




### Test Cases

| Login Validation Tests                                                                     | Functional Application Tests                                                                                                                           |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| After entering incorrect data, the user should receive an appropriate message.             | As a app user you should be able to login (standard_user) and save session.                                                                            |
| After entering locked_out_user data, the application should return an appropriate message. | As a app user you should be able to view all links in footer (status code 200).                                                                        |
| After entering standard_user data, the application should approve the login.               | As a app user, you should be able see all the descriptions of products, titles, prices, and their equivalents in the subpages of a particular product. |
| The problem_user should be able to log in with correct data.                               | As a app user, you should be able to sort by any category, all products.                                                                               |
| The performance_glitch_user should be able to log in with correct data.                    | As a app user, you should be able to add products to the cart and place orders. The data should be accurate.                                           |
|                                                                                            | As a app user, you should be able to logout, and clear sesion.                                                                                         |
