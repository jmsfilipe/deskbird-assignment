declare namespace Cypress {
  interface Chainable<Subject = string> {
    login(username: string, password: string): Chainable<Element>;
    navigateTo(path: string): Chainable<Element>;
    editFirstUser(newName: string, newUsername: string, newRole: string): Chainable<Element>;
  }
}
