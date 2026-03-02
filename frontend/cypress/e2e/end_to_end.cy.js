describe('End-to-End User and Task Workflow', () => {
  let user;
  let task;

  before(() => {
    cy.fixture('user').then((u) => { user = u; });
    cy.fixture('task').then((t) => { task = t; });
    // Register the user via API (idempotent for test runs)
    cy.request({
      method: 'POST',
      url: '/api/v1/auth/register/',
      body: user,
      failOnStatusCode: false,
    });
  });

  it('performs login, creates, updates and deletes a task through the UI', () => {
    cy.login(user.username, user.password);
    cy.visit('/');

    // Search placeholder
    cy.get('[data-cy=search-input]').type(task.title);
    cy.get('[data-cy=search-button]').click();

    // Add new task (checkout)
    cy.get('[data-cy=add-task]').click();
    cy.get('[data-cy=task-title]').type(task.title);
    cy.get('[data-cy=task-desc]').type(task.description);
    cy.get('[data-cy=save-task]').click();

    // Verify task appears in list
    cy.contains(task.title).should('exist');

    // Edit task (return)
    cy.contains(task.title).parent().find('[data-cy=edit-task]').click();
    cy.get('[data-cy=task-completed]').check();
    cy.get('[data-cy=save-task]').click();

    // Delete task (cancel reservation)
    cy.contains(task.title).parent().find('[data-cy=delete-task]').click();
    cy.contains(task.title).should('not.exist');
  });
});
