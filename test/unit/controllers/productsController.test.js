const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
const next = require('../../../middlewares/error');

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

describe('b_ctrl - Busca apenas um produto do BD por seu ID', () => {
  describe('Situação 1-b_ctrl: Não existe um produto com o ID informado', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 15 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      const productNotFound = {
        error: {
          code: 404,
          message: 'Product not found'
        }
      };

      //sinon.stub(productsService, 'findById').resolves(true);
      sinon.stub(productsService, 'findById').resolves(productNotFound);
    });

    after(() => productsService.findById.restore());

    it('é chamado o método "status" passando 404', async () => {
      await productsController.findById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" passando a mensagem "error"', async () => {
      await productsController.findById(request, response);

      expect(response.json.calledWith('error')).to.be.equal(true);
    });

    it('Retorna erro com código e mensagem de "notFound"', async () => {
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

describe('c_ctrl - Adiciona um novo produto no BD', () => {
  describe.skip('Situação 1-c_ctrl: Já existe um produto com este nome no BD', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 15 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      const productNotFound = {
        error: {
          code: 404,
          message: 'Product not found'
        }
      };

      //sinon.stub(productsService, 'findById').resolves(true);
      sinon.stub(productsService, 'findById').resolves(productNotFound);
    });

    after(() => productsService.findById.restore());

    it('é chamado o método "status" passando 404', async () => {
      await productsController.findById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" passando a mensagem "error"', async () => {
      await productsController.findById(request, response);

      expect(response.json.calledWith('error')).to.be.equal(true);
    });

    it('Retorna erro com código e mensagem de "notFound"', async () => {
      const { message } = await productsController.findById(request, response);

      expect(message).to.equal('Product not found');
    });
  });

  describe('Situação 2-b_ctrl: É inserido com sucesso, não existia um produto com este nome', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      request.body = {
        name: 'Celular',
        quantity: 3,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      const resolve = {
          id: 1,
          name: 'Celular',
          quantity: 3
        };

      sinon.stub(productsService, 'create').resolves(resolve);
    });

    after(() => productsService.create.restore());

    it('é chamado o método "status" passando 201', async () => {
      await productsController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productsController.create(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

});
