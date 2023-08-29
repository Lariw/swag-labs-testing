/// <reference types="Cypress" />

describe("Logging", () => {
  let failedLoginData = null;
  let projectDetails = null;

  before(() => {
    cy.fixture("failedLoginData.json").then((data) => {
      failedLoginData = data;
    });
  });

  beforeEach(() => {
    cy.fixture("projectDetails.json").then((data) => {
      projectDetails = data;
    });
  });

  it("The incorrect login message should be displayed correctly", () => {
    cy.visit(projectDetails.baseURL);
    cy.url().should("equal", projectDetails.baseURL);

    cy.get('[data-test="username"]').type(failedLoginData.username);

    cy.get('[data-test="username"]')
      .invoke("val")
      .then((usernameValue) => {
        expect(usernameValue).to.equal(failedLoginData.username);
      });

    cy.get('[data-test="password"]').type(failedLoginData.password);

    cy.get('[data-test="password"]')
      .invoke("val")
      .then((passwordValue) => {
        expect(passwordValue).to.equal(failedLoginData.password);
      });
    cy.get('[data-test="login-button"]').click({ force: true });

    cy.get(".form_group").each((formGroup, index) => {
      cy.wrap(formGroup).find("svg").should("exist");
    });

    cy.get(".error-message-container.error > h3")
      .should("exist")
      .then((el) => {
        expect(el).to.contain(
          "Epic sadface: Username and password do not match any user in this service"
        );
      });
  });
});
