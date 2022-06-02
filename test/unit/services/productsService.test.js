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
    before(() => sinon.stub(productsModel, 'findById').resolves(false));

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

describe('c_serv - Adiciona um novo produto no BD', () => {
  const payload = {
    name: 'Playstation',
    quantity: 69,
  };

  describe('Situação 1-c_serv: Já existe um produto com este nome no BD', () => {
    before(() => {
      const resolve = [
        {
          id: 1,
          name: 'Playstation',
          quantity: 69
        }
      ];

      sinon.stub(productsModel, 'findByName').resolves(resolve);
    });

    after(() => productsModel.findByName.restore());

    it('Retorna um erro', async () => {
      const response = await productsService.create(payload);

      expect(response).to.be.an('object').that.include.property('error');
    });

    it('Retorna erro com código e mensagem de "notFound"', async () => {
      const { error: { code, message }} = await productsService.create(payload);

      expect(code).to.equal('alreadyExists');
      expect(message).to.equal('Product already exists');
    });
  });

  describe('Situação 2-c_serv: É inserido com sucesso, não existia um produto com este nome', () => {
    before(() => {
      const resolve = {
        id: 1,
        name: 'Playstation',
        quantity: 69
      };

      sinon.stub(productsModel, 'create').resolves(resolve);
    });

    after(() => productsModel.create.restore());

    it('Retorna um object que não está vazio', async () => {
      const productItem = await productsService.create(payload);

      expect(productItem).to.be.an('object').that.is.not.empty;
    });

    it('Retorna as propriedades corretas', async () => {
      const productItem = await productsService.create(payload);

      expect(productItem).to.have.all.keys('id', 'name', 'quantity');
    });
  });

});

describe('d_serv - Atualiza um produto no BD', () => {
  describe('Situação 1-d_serv: É atualizado com sucesso', () => {
    const id = 10;
    const payloadProduct = {
          name: "Xbox",
          quantity: 32,
        };

    before(() => {
      const resolve = {
        id: 10,
        name: "Xbox",
        quantity: 32,
      };

      sinon.stub(productsModel, 'update').resolves(resolve);
    });

    after(() => productsModel.update.restore());

    it('Retorna um object que não está vazio', async () => {
      const response = await productsService.update(id, payloadProduct);

      expect(response).to.be.an('object').that.is.not.empty;
    });

    it('Retorna as propriedades corretas', async () => {
      const response = await productsService.update(id, payloadProduct);

      expect(response).to.have.all.keys('id', 'name', 'quantity');
    });
  });
});
