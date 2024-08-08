describe('User Edit', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.login('admin', 'admin');
  });

  it('should edit user as admin', () => {
    cy.editFirstUser('Admin 2', 'updatedAdmin', 'Admin');
    cy.get('mat-list-item').should('contain', 'updatedAdmin');
  });
});
