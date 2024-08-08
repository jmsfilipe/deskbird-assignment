Cypress.Commands.add('login', (username, password) => {
  cy.get('[formControlName="username"]').type(username);
  cy.get('[formControlName="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('navigateTo', (path) => {
  cy.visit(path);
});

Cypress.Commands.add('editFirstUser', (newName, newUsername, newRole) => {
  cy.get('button[aria-label="Edit user"]').first().click();
  cy.get('[formControlName="name"]').clear().type(newName);
  cy.get('[formControlName="username"]').clear().type(newUsername);
  cy.get('[formControlName="role"]').click().get('mat-option').contains(newRole).click();
  cy.contains('button', 'Save').click();
});
