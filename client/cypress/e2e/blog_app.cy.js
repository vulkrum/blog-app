describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.visit('');
  });

  it('login form is shown', function () {
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    let user1;
    let user2;
    beforeEach(function () {
      user1 = {
        username: 'testUser1',
        password: 'password',
        name: 'John Smith',
      };

      user2 = {
        username: 'testUser2',
        password: 'password',
        name: 'Karl Marx',
      };

      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1);
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2);
    });

    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type(`${user1.username}`);
      cy.get('#password-input').type(`${user1.password}`);
      cy.get('#login-btn').click();
      cy.contains(`${user1.name} logged in`);
    });

    it('fails with wrong credentials', function () {
      cy.get('#username-input').type(`${user1.username}`);
      cy.get('#password-input').type('wrongPassword');
      cy.get('#login-btn').click();
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('html').should('not.contain', `${user1.name} logged in`);
    });

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login(user1);
        cy.createBlog({
          title: 'Fake Blog 1',
          author: 'John Smith',
          url: 'http://foo.bar',
          likes: 0,
        });
      });

      it('a blog can be created', function () {
        cy.get('#show-btn').click();
        cy.get('#blog-title-input').type('Elden Ring');
        cy.get('#blog-author-input').type('Hidetaka Miyazaki');
        cy.get('#blog-url-input').type('https://fromsoftware.jp');
        cy.get('#create-blog-btn').click();
        cy.get('#toggle-blog-btn').click();
        cy.contains('a new blog Elden Ring by Hidetaka Miyazaki added');
        cy.contains('Elden Ring Hidetaka Miyazaki');
      });

      it('a user can like the blog', function () {
        cy.get('#toggle-blog-btn').click();
        cy.get('#like-blog-btn').click();
        cy.get('#blog-likes').contains('likes 1');
        cy.get('#like-blog-btn').click();
        cy.get('#like-blog-btn').click();
        cy.get('#blog-likes').contains('likes 3');
      });

      it('a blog can be deleted', function () {
        cy.get('#toggle-blog-btn').click();
        cy.get('#delete-blog-btn').click();
        cy.get('html').should('not.contain', 'Fake Blog 1 John Smith');
      });

      it('delete button hidden from non-creator', function () {
        cy.login(user2);
        cy.get('#toggle-blog-btn').click();
        cy.contains('Fake Blog 1 John Smith').should('not.contain', 'remove');
      });

      it('check if sort order is correct', function () {
        cy.createBlog({
          title: 'Fake Blog 2',
          author: 'John Smith',
          url: 'http://foo.bar',
          likes: 5,
        });

        cy.createBlog({
          title: 'Fake Blog 3',
          author: 'John Smith',
          url: 'http://foo.bar',
          likes: 10,
        });

        cy.createBlog({
          title: 'Fake Blog 4',
          author: 'John Smith',
          url: 'http://foo.bar',
          likes: 2,
        });

        cy.get('#sort-btn').click();
        cy.get('.blog').eq(0).should('contain', 'Fake Blog 3');
        cy.get('.blog').eq(1).should('contain', 'Fake Blog 2');
        cy.get('.blog').eq(2).should('contain', 'Fake Blog 4');
        cy.get('.blog').eq(3).should('contain', 'Fake Blog 1');
      });
    });
  });
});
