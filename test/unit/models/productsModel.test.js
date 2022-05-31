const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('a_model - Consulta todos os produtos do BD', () => {
  describe('Situação 1-a_model: Não existem produtos cadastrados no BD', () => {
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

  describe('Situação 2-a_model: Existem produtos cadastrados no BD', () => {
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

describe('b_model - Busca apenas um produto do BD por seu ID', () => {
  describe('Situação 1-b_model: Não existe um produto com o ID informado', () => {
    before(() => {
      const resolve = [[]];

      sinon.stub(connection, 'execute').resolves(resolve);
    });

    after(() => connection.execute.restore());

    it('Retorna null', async () => {
      const response = await productsModel.findById();

      expect(response).to.be.null;
    });
  });

  describe('Situação 2-b_model: Existe um produto com o ID informado', () => {
    before(() => {
      const resolve = [
        [
          {
            id: 1,
            name: 'Celular',
            quantity: 3
          }
        ]
      ];

      sinon.stub(connection, 'execute').resolves(resolve);
    });

    after(() => connection.execute.restore());

    it('Retorna um object que não está vazio', async () => {
      const response = await productsModel.findById(1);

      expect(response).to.be.an('object').that.is.not.empty;
    });

    it('Retorna as propriedades corretas', async () => {
      const response = await productsModel.findById(1);

      expect(response).to.have.all.keys('id', 'name', 'quantity');
    });
  });

});

describe('c_model - Busca apenas um produto do BD por seu "nome"', () => {
  describe('Situação 1-c: Não existe o produto com este "nome" cadastrado no BD', () => {
    before(() => sinon.stub(connection, 'execute').resolves([[]]));

    after(() => connection.execute.restore());

    it('Retorna um array vazio', async () => {
      const response = await productsModel.findByName('teste');

      expect(response).to.be.an('array').that.is.empty;
    });
  });

  describe('Situação 2-c: Existe o produto com este "nome" cadastrado no BD', () => {
    before(() => {
      const resolve = [
        [
          {
            id: 1,
            name: 'Celular',
            quantity: 3
          }
        ]
      ];

      sinon.stub(connection, 'execute').resolves(resolve);
    });

    after(() => connection.execute.restore());

    it('Retorna um object que não está vazio', async () => {
      const [response] = await productsModel.findByName('Celular');

      expect(response).to.be.an('object').that.is.not.empty;
    });

    it('Retorna as propriedades corretas', async () => {
      const [response] = await productsModel.findByName('Celular');

      expect(response).to.have.all.keys('id', 'name', 'quantity');
    });
  });

});
