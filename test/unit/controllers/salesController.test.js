const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('a_salesCtrl - Consulta todas as vendas do BD', () => {
  describe('Situação 1-a_salesCtrl: Não existem vendas cadastradas no BD', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves([]);
    });

    afterEach(() => salesService.getAll.restore());

    it('é chamado o status com o código 200', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

  });

  describe('Situação 2-a_salesCtrl: Existem vendas cadastradas no BD', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

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

      sinon.stub(salesService, 'getAll').resolves(resolve);
    });

    afterEach(() => salesService.getAll.restore());

    it('Retorna um código 200', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna o json passando um array', async () => {
      await salesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe('b_salesCtrl - Busca apenas um produto do BD por seu ID', () => {
  /*describe.only('Situação 1-b_salesCtrl: Não existe um produto com o ID informado', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.params = { id: 15 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub().returns();

      const saleNotFound = {
        error: {
          code: 404,
          message: 'Sale not found'
        }
      };

      sinon.stub(salesService, 'findById').resolves(saleNotFound);
    });

    afterEach(() => salesService.findById.restore());

    it.only('é chamado o método "status" passando 404', async () => {
      await salesController.findById(request, response, next);
      console.log(typeof next)

      expect(next.calledWith(404)).to.be.equal(true);
      //expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" passando a mensagem "error"', async () => {
      await salesController.findById(request, response, next);

      expect(response.json.calledWith('error')).to.be.equal(true);
    });

    it('Retorna erro com código e mensagem de "notFound"', async () => {
      const { message } = await salesController.findById(request, response, next);

      expect(message).to.equal('Product not found');
    });
  });*/

  describe('Situação 2-b_salesCtrl: Existe um produto com o ID informado', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      const resolve = [
        {
          productId: 1,
          quantity: 2,
          date: "2021-09-09T04:54:29.000Z",
        },
        {
          productId: 2,
          quantity: 10,
          date: "2022-06-01T01:10:26.000Z",
        }
      ];

      sinon.stub(salesService, 'findById').resolves(resolve);
    });

    afterEach(() => salesService.findById.restore());

    it('é chamado o método "status" passando 200', async () => {
      await salesController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await salesController.findById(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

});
