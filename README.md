# Swang Lab Testing | Tests case version - 2.0.1 | Cypress version - 13.3.0

## The tests written for the website: https://www.saucedemo.com/

### Test Cases

| Login Validation Tests                                                                     | Functional Application Tests                                                                                                                           |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| After entering incorrect data, the user should receive an appropriate message.             | As a app user you should be able to login (standard_user) and save session.                                                                            |
| After entering locked_out_user data, the application should return an appropriate message. | As a app user you should be able to view all links in footer (status code 200).                                                                        |
| After entering standard_user data, the application should approve the login.               | As a app user, you should be able see all the descriptions of products, titles, prices, and their equivalents in the subpages of a particular product. |
| The problem_user should be able to log in with correct data.                               | As a app user, you should be able to sort by any category, all products.                                                                               |
| The performance_glitch_user should be able to log in with correct data.                    | As a app user, you should be able to add products to the cart and place orders. The data should be accurate.                                           |
|                                                                                            | As a app user, you should be able to logout, and clear sesion.                                                                                         |
