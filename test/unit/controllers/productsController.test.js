const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('a_ctrl - Consulta todos os produtos do BD', () => {
  describe('Situação 1-a_ctrl: Não existem produtos cadastrados no BD', () => {
    const response = {};
    const request = {};
    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves([]);
    });

    after(() => productsService.getAll.restore());

    it('é chamado o status com o código 200', async () => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

  });

  describe('Situação 2-a_ctrl: Existem produtos cadastrados no BD', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      const resolve = [
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
      ];

      sinon.stub(productsService, 'getAll').resolves(resolve);
    });

    after(() => productsService.getAll.restore());

    it('Retorna um código 200', async () => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna o json passando um array', async () => {
      await productsController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

  });

});

/*
describe('b_ctrl - Busca apenas um produto do BD por seu ID', () => {
  describe.only('Situação 1-b_ctrl: Não existe um produto com o ID informado', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      const errorNotFound = {
        error: {
          code: 'notFound',
          message: 'Product not found'
        }
      };

      sinon.stub(productsService, 'findById').resolves(errorNotFound);
    });

    after(() => productsService.findById.restore());

    it('é chamado o método "status" passando 404', async () => {
      await productsController.findById(request, response, next);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it.skip('é chamado o método "json" passando a mensagem "error"', async () => {
      await productsController.findById(request, response);

      expect(response.json.calledWith('error')).to.be.equal(true);
    });

    it.skip('Retorna erro com código e mensagem de "notFound"', async () => {
      const { message } = await productsController.findById(request, response);

      expect(message).to.equal('Product not found');
    });
  });

  describe('Situação 2-b_ctrl: Existe um produto com o ID informado', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      const resolve = {
          id: 1,
          name: 'Celular',
          quantity: 3
        };

      sinon.stub(productsService, 'findById').resolves(resolve);
    });

    after(() => productsService.findById.restore());

    it('é chamado o método "status" passando 200', async () => {
      await productsController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productsController.findById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

});
*/
