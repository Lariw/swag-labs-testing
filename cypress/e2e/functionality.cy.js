/// <reference types="Cypress" />

describe("Functional Application Tests", () => {
  let standardUser = null;
  let failedLoginData = null;
  let projectDetails = null;
  let lockedUser = null;
  let performanceGlitchUser = null;
  let problemUser = null;
  let userOrderData = null;

  before(() => {
    cy.fixture("failedLoginData.json").then((data) => {
      failedLoginData = data;
    });
    cy.fixture("locket_out_user.json").then((data) => {
      lockedUser = data;
    });
    cy.fixture("standard_user.json").then((data) => {
      standardUser = data;
    });
    cy.fixture("performance_glitch_user.json").then((data) => {
      performanceGlitchUser = data;
    });
    cy.fixture("problem_user.json").then((data) => {
      problemUser = data;
    });
    cy.fixture("userOrderData.json").then((data) => {
      userOrderData = data;
    });
  });

  beforeEach(() => {
    cy.fixture("projectDetails.json").then((data) => {
      projectDetails = data;
    });
  });

  it("As a app user you should be able to login (standard_user) and save session.", () => {
    cy.visit(projectDetails.baseURL);
    cy.url().should("equal", projectDetails.baseURL);

    cy.correctLogging(standardUser.username, standardUser.password);

    cy.SaveYourSession();
  });

  it("As a app user you should be able to view all links in footer (status code 200). ", () => {
    cy.ReadYourSession();

    cy.visit("https://www.saucedemo.com/inventory.html", {
      failOnStatusCode: false,
    });
    cy.TestingFooter();
  });

  it("As a app user, you should be able see all the descriptions of products, titles, prices, and their equivalents in the subpages of a particular product.", () => {
    cy.ReadYourSession();

    cy.visit("https://www.saucedemo.com/inventory.html", {
      failOnStatusCode: false,
    });

    cy.get(".inventory_item_description").each((element) => {
      let elementPrice = element.find(".inventory_item_price").text();
      let elementDesc = element.find(".inventory_item_desc").text();
      let elementName = element.find(".inventory_item_name").text();

      let elementLink = element.find(".inventory_item_label > a").text();

      cy.contains(elementLink).click();

      let comparisonName = null;
      let comparisonDesc = null;
      let comparisonPrice = null;

      cy.get(".inventory_details").then((details) => {
        comparisonName = details.find(".inventory_details_name").text();
        comparisonPrice = details.find(".inventory_details_price").text();
        comparisonDesc = details.find(".inventory_details_desc").text();

        cy.wrap(elementPrice).should("eq", comparisonPrice);
        cy.wrap(elementDesc).should("eq", comparisonDesc);
        cy.wrap(elementName).should("eq", comparisonName);
      });

      cy.get('[data-test="back-to-products"]').click();

      cy.wait(2000);
    });
  });

  it("As a app user, you should be able to sort by any category, all products.", () => {
    cy.ReadYourSession();

    cy.visit("https://www.saucedemo.com/inventory.html", {
      failOnStatusCode: false,
    });

    let sortedPrice = [];
    let sortedName = [];

    let elementPrice = null;
    let elementName = null;

    cy.get('[data-test="product_sort_container"]').select("za");

    cy.wait(3000);

    cy.get(".inventory_item_description").each((element) => {
      cy.wrap(element).then((el) => {
        elementPrice = element.find(".inventory_item_price").text();
        elementName = element.find(".inventory_item_name").text();

        sortedPrice.push(elementPrice);
        sortedName.push(elementName);
      });
    });

    cy.then(() => {
      sortedPrice.forEach((el) => {
        cy.log(el);
      });
      sortedName.forEach((el) => {
        cy.log(el);
      });
    });

    cy.get('[data-test="product_sort_container"]').select("az");

    cy.get(".inventory_item_description").each((element) => {
      cy.wrap(element).then((el) => {
        elementPrice = element.find(".inventory_item_price").text();
        elementName = element.find(".inventory_item_name").text();

        sortedPrice.push(elementPrice);
        sortedName.push(elementName);
      });
    });

    cy.then(() => {
      sortedPrice.forEach((el) => {
        cy.log(el);
      });
      sortedName.forEach((el) => {
        cy.log(el);
      });
    });
  });

  it("As a app user, you should be able to add products to the cart and place orders. The data should be accurate.", () => {
    cy.ReadYourSession();

    cy.visit("https://www.saucedemo.com/inventory.html", {
      failOnStatusCode: false,
    });

    cy.get(".btn_primary").each((button) => {
      button.click();
    });

    cy.wait(2000);

    cy.get(".shopping_cart_badge").should("contain", 6);

    cy.get(".btn_secondary").each((removeButton) => {
      removeButton.click();
    });

    cy.get(".shopping_cart_badge").should("not.exist");

    let orderedElementPrice;
    let randomNum = Math.floor(Math.random() * 5) + 1;
    cy.then(() => {
      return cy
        .get(".inventory_item_price")
        .eq(randomNum)
        .invoke("text")
        .then((price) => {
          orderedElementPrice = price;
        });
    }).then(() => {
      cy.get(".btn_primary").eq(randomNum).click();

      cy.log(orderedElementPrice);

      cy.get(".shopping_cart_link").scrollIntoView().click();

      cy.get(".inventory_item_price").should("contain", orderedElementPrice);

      cy.get("#checkout").click();

      cy.get('[data-test="firstName"]').type(userOrderData.firstName);
      cy.get('[data-test="lastName"]').type(userOrderData.lastName);
      cy.get('[data-test="postalCode"]').type(userOrderData.postalCode);

      cy.get('[data-test="continue"]').click();

      cy.wait(3000);
      cy.get('[data-test="finish"]').click();
      cy.get('[data-test="back-to-products"]').click();
    });
  });

  it("As a app user, you should be able to logout, and clear sesion.", () => {
    cy.ReadYourSession();

    cy.visit("https://www.saucedemo.com/inventory.html", {
      failOnStatusCode: false,
    });

    cy.get("#react-burger-menu-btn").scrollIntoView().click();
    cy.get("#logout_sidebar_link").click();

    cy.clearCookies();
    cy.clearCookiesFile();
  });
});
