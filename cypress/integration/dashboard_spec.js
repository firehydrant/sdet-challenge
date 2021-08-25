describe('Dashboard', () => {
  it('base route redirects to /dashboard', () => {
    cy.visit('http://localhost:3000');
    cy.url().should('contain', '/dashboard');
  });
});
