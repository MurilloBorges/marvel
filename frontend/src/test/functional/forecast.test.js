/* eslint-disable no-undef */
const { default: Auth } = require('../../services/Auth/Auth');
const errors = require('../fixtures/marvel_errors.json');

describe('Beach forecast functional tests', () => {
  it('Deve retornar success true (logado): ', async () => {
    const auth = await Auth.login({
      email: 'murilloborges@marvel.com',
      password: '123456',
    });
    console.log(auth);
    expect(auth[0]).toHaveProperty('success', true);
  });
});
