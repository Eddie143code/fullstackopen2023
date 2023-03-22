describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("");
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("POST", "http://localhost:3001/api/login", {
      username: "usernametest",
      password: "passwordtest",
    });
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("usernametest");
      cy.get("#password").type("passwordtest");
      cy.get("#login").click();

      cy.get(".message").contains(`error`);
    });
  });
});
