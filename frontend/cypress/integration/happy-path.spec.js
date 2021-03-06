/* eslint-disable no-undef */
/// <reference types="Cypress" />
/// <reference path="../support/commands.js" />

describe('Action happy path application', () => {
  beforeEach(() => {
    cy.fixture('user.json').as('user');
    cy.fixture('cep.json').as('cep');
  });

  it('Realizando teste de autenticação', function () {
    cy.visit('/login');
    const { user } = this;
    cy.login(user.email, user.password);
  });

  it('Realizando testes na funcionalidade de busca CEP', function () {
    const { cep } = this;
    cy.log('Testando o CEP válido');
    cy.buscaCEP(cep.valid);
  });

  it('Realizando teste de deslogar o usuário', () => {
    cy.log('Testando o deslogar do usuário');
    cy.dataCy('deslogar').click({ force: true });
  });
});
