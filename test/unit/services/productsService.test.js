const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('a_serv - Consulta todos os produtos do BD', () => {
  describe('Situação 1-a_serv: Não existem produtos cadastrados no BD', () => {
    before(() => sinon.stub(productsModel, 'getAll').resolves([]));

    after(() => productsModel.getAll.restore());

    it('Retorna um array vazio', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.an('array').that.is.empty;
    });
  });

  describe('Situação 2-a_serv: Existem produtos cadastrados no BD', () => {
    before(() => {
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

      sinon.stub(productsModel, 'getAll').resolves(resolve);
    });

    after(() => productsModel.getAll.restore());

    it('Retorna um array que não está vazio', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.an('array').that.is.not.empty;
    });

    it('Retorna um array com dois objetos dos produtos e suas propriedades', async () => {
      const response = await productsService.getAll();

      expect(response).to.have.lengthOf(2);
      expect(response[0]).to.be.an('object').that.has.all.keys('id', 'name', 'quantity');
    });

    it('Retorna os produtos corretos', async () => {
      const response = await productsService.getAll();

      expect(response.map(product=>product.name)).to.include('Celular', 'Kindle');
      expect(response[1]).to.include({ id: 2, name: 'Kindle', quantity: 7 });
    });
  });

});

describe('b_serv - Busca apenas um produto do BD por seu ID', () => {
  describe('Situação 1-b: Não existe um produto com o ID informado', () => {
    before(() => {
      const errorNotFound = {
        error: {
          code: 'notFound',
          message: 'Product not found'
        }
      };

      sinon.stub(productsModel, 'findById').resolves(errorNotFound);
    });

    after(() => productsModel.findById.restore());

    it('Retorna um objeto contendo o erro', async () => {
      const response = await productsService.findById();

      expect(response).to.be.an('object').that.include.property('error');
    });

    it('Retorna erro com código e mensagem de "notFound"', async () => {
      const { error: { code, message }} = await productsService.findById(5);

      expect(code).to.equal('notFound');
      expect(message).to.equal('Product not found');
    });
  });

  describe('Situação 2-b: Existe um produto com o ID informado', () => {
    before(() => {
      const resolve = {
          id: 1,
          name: 'Celular',
          quantity: 3
        };

      sinon.stub(productsModel, 'findById').resolves(resolve);
    });

    after(() => productsModel.findById.restore());

    it('Retorna um object que não está vazio', async () => {
      const productItem = await productsService.findById(1);

      expect(productItem).to.be.an('object').that.is.not.empty;
    });

    it('Retorna as propriedades corretas', async () => {
      const productItem = await productsService.findById(1);

      expect(productItem).to.have.all.keys('id', 'name', 'quantity');
    });
  });

});
