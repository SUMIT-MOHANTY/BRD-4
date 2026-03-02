Cypress.Commands.add('login', (username, password) => {
  const apiBase = Cypress.env('API_BASE') || 'http://localhost:8000';
  cy.request('POST', `${apiBase}/api/v1/auth/login/`, { username, password })
    .then((resp) => {
      const token = resp.body.access;
      // Store token in an http‑only cookie (simulated for tests)
      cy.setCookie('jwt', token);
    });
});
