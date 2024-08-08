describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should log in as admin and navigate to user list', () => {
    cy.login('admin', 'admin');
    cy.url().should('include', '/users');
  });

  it('should log in as user and navigate to user list', () => {
    cy.login('user', 'user');
    cy.url().should('include', '/users');
  });
});
