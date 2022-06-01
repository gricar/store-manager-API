const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('a_salesServ - Consulta todas as vendas do BD', () => {
  describe('Situação 1-a_salesServ: Não existem vendas cadastradas no BD', () => {
    before(() => sinon.stub(salesModel, 'getAll').resolves([]));

    after(() => salesModel.getAll.restore());

    it('Retorna um array vazio', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('array').that.is.empty;
    });
  });

  describe('Situação 2-a_salesServ: Existem vendas cadastradas no BD', () => {
    before(() => {
      const resolve = [
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2
        }
      ];

      sinon.stub(salesModel, 'getAll').resolves(resolve);
    });

    after(() => salesModel.getAll.restore());

    it('Retorna um array que não está vazio', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('array').that.is.not.empty;
    });

    it('Retorna um array com dois objetos das vendas e suas propriedades', async () => {
      const response = await salesService.getAll();

      expect(response).to.have.lengthOf(2);
      expect(response[0]).to.be.an('object').that.has.all.keys('saleId', 'date', 'productId', 'quantity');
    });

    it('Retorna os produtos corretos', async () => {
      const response = await salesService.getAll();

      expect(response.map(product=>product.productId)).to.include(1, 2);
      expect(response[1]).to.include({
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      });
    });
  });

});
