Cypress.Commands.add("correctLogging", (username, passwd) => {
  cy.get('[data-test="username"]').type(username);

  cy.get('[data-test="username"]')
    .invoke("val")
    .then((usernameValue) => {
      expect(usernameValue).to.equal(username);
    });

  cy.get('[data-test="password"]').type(passwd);

  cy.get('[data-test="password"]')
    .invoke("val")
    .then((passwordValue) => {
      expect(passwordValue).to.equal(passwd);
    });
  cy.get('[data-test="login-button"]').click({ force: true });
});

Cypress.Commands.add("incorrectLogging", (username, passwd, textMessage) => {
  cy.get('[data-test="username"]').type(username);

  cy.get('[data-test="username"]')
    .invoke("val")
    .then((usernameValue) => {
      expect(usernameValue).to.equal(username);
    });

  cy.get('[data-test="password"]').type(passwd);

  cy.get('[data-test="password"]')
    .invoke("val")
    .then((passwordValue) => {
      expect(passwordValue).to.equal(passwd);
    });
  cy.get('[data-test="login-button"]').click({ force: true });

  cy.get(".form_group").each((formGroup, index) => {
    cy.wrap(formGroup).find("svg").should("exist");
  });

  cy.get(".error-message-container.error > h3")
    .should("exist")
    .then((el) => {
      expect(el).to.contain(textMessage);
    });
});

Cypress.Commands.add("SaveYourSession", () => {
  cy.then(() => {
    cy.getCookies().then((cookies) => {
      cy.writeFile("cypress/fixtures/cookies.json", JSON.stringify(cookies));
    });
  });
});

Cypress.Commands.add("ReadYourSession", () => {
  cy.readFile("cypress/fixtures/cookies.json").then((cookies) => {
    cookies.forEach((cookie) => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expiry: cookie.expiry,
      });
    });
  });
});

Cypress.Commands.add("clearCookiesFile", () => {
  cy.then(() => {
    cy.writeFile("cypress/fixtures/cookies.json", JSON.stringify(""));
  });
});

Cypress.Commands.add("TestingFooter", () => {
  cy.get(".footer").scrollIntoView();

  cy.get(".footer > ul > li> a").each((link) => {
    cy.request(link.prop("href")).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  cy.get(".footer_copy").should("contain", "2024");
});
