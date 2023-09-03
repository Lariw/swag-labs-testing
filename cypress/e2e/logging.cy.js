/// <reference types="Cypress" />

describe("Login Validation Tests.", () => {
  let failedLoginData = null;
  let projectDetails = null;
  let lockedUser = null;
  let standardUser = null;
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

  it("After entering incorrect data, the user should receive an appropriate message.", () => {
    cy.visit(projectDetails.baseURL);
    cy.url().should("equal", projectDetails.baseURL);

    cy.incorrectLogging(
      failedLoginData.username,
      failedLoginData.password,
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("After entering locked_out_user data, the application should return an appropriate message.", () => {
    cy.visit(projectDetails.baseURL);
    cy.url().should("equal", projectDetails.baseURL);

    cy.incorrectLogging(
      lockedUser.username,
      lockedUser.password,
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  it("After entering standard_user data, the application should approve the login.", () => {
    cy.visit(projectDetails.baseURL);
    cy.url().should("equal", projectDetails.baseURL);

    cy.correctLogging(standardUser.username, standardUser.password);
  });

  it("The problem_user should be able to log in with correct data.", () => {
    cy.visit(projectDetails.baseURL);
    cy.url().should("equal", projectDetails.baseURL);

    cy.correctLogging(problemUser.username, problemUser.password);
  });

  it("The performance_glitch_user should be able to log in with correct data.", () => {
    cy.visit(projectDetails.baseURL);
    cy.url().should("equal", projectDetails.baseURL);

    cy.correctLogging(
      performanceGlitchUser.username,
      performanceGlitchUser.password
    );
  });
});
