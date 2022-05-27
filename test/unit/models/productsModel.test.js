const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('a - Consulta todos os produtos do BD', () => {
  describe('Situação 1-a: Não existem produtos cadastrados no BD', () => {
    before(() => {
      const resolve = [[]];

      sinon.stub(connection, 'execute').resolves(resolve);
    });

    after(() => connection.execute.restore());

    it('Retorna um array vazio', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.an('array').that.is.empty;
    });
  });

  describe('Situação 2-a: Existem produtos cadastrados no BD', () => {
    before(() => {
      const resolve = [
        [
          {
            id: 1,
            name: 'Celular',
            quantity: 3
          },
          {
            id: 2,
            name: 'Kindle',
            quantity: 7
          }
        ]
      ];

      sinon.stub(connection, 'execute').resolves(resolve);
    });

    after(() => connection.execute.restore());

    it('Retorna um array que não está vazio', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.an('array').that.is.not.empty;
    });

    it('Retorna um array com dois objetos dos produtos e suas propriedades', async () => {
      const response = await productsModel.getAll();

      expect(response).to.have.lengthOf(2);
      expect(response[0]).to.be.an('object').that.has.all.keys('id', 'name', 'quantity');
    });

    it('Retorna os produtos corretos', async () => {
      const response = await productsModel.getAll();

      expect(response.map(product=>product.name)).to.include('Celular', 'Kindle');
      expect(response[1]).to.include({ id: 2, name: 'Kindle', quantity: 7 });
    });
  });

});
