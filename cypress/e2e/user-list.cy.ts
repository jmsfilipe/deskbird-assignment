describe('User List', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display users with edit buttons for admin', () => {
    cy.login('admin', 'admin');
    cy.get('mat-list').find('mat-list-item').should('have.length.greaterThan', 1);
    cy.get('button[aria-label="Edit user"]').should('exist');
  });

  it('should display users without edit buttons for regular user', () => {
    cy.login('user', 'user');
    cy.get('mat-list').find('mat-list-item').should('have.length.greaterThan', 1);
    cy.get('button[aria-label="Edit user"]').should('not.exist');
  });
});
