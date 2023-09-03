/// <reference types="Cypress" />

describe("Functional Application Tests", () => {
  let standardUser = null;
  let failedLoginData = null;
  let projectDetails = null;
  let lockedUser = null;
  let performanceGlitchUser = null;
  let problemUser = null;

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
  });

  beforeEach(() => {
    cy.fixture("projectDetails.json").then((data) => {
      projectDetails = data;
    });
  });

  it("Login to standard_user, save session", () => {
    cy.visit(projectDetails.baseURL);
    cy.url().should("equal", projectDetails.baseURL);

    cy.correctLogging(standardUser.username, standardUser.password);

    cy.SaveYourSession();
  });

  it("Test footera", () => {
    cy.ReadYourSession();

    cy.visit("https://www.saucedemo.com/inventory.html", {
      failOnStatusCode: false,
    });
    cy.TestingFooter();
  });

  it("Validation tests of descriptions, titles and prices", () => {
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

  it("Product sorting tests", () => {
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

  it("Logout and clear session", () => {
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
