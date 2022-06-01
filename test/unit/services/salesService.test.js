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

describe('b_salesServ - Busca apenas uma venda do BD por seu ID', () => {
  describe('Situação 1-b_salesServ: Não existe uma venda com o ID informado', () => {
    before(() => sinon.stub(salesModel, 'findById').resolves(undefined));

    after(() => salesModel.findById.restore());

    it('Retorna um objeto contendo o erro', async () => {
      const response = await salesService.findById();

      expect(response).to.be.an('object').that.include.property('error');
    });

    it('Retorna erro com código e mensagem de "notFound"', async () => {
      const { error: { code, message }} = await salesService.findById(5);

      expect(code).to.equal('notFound');
      expect(message).to.equal('Sale not found');
    });
  });

  describe('Situação 2-b_salesServ: Existe vendas com o ID informado', () => {
    before(() => {
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

      sinon.stub(salesModel, 'findById').resolves(resolve);
    });

    after(() => salesModel.findById.restore());

    it('Retorna um array que não está vazio', async () => {
      const productItem = await salesService.findById(1);

      expect(productItem).to.be.an('array').that.is.not.empty;
    });

    it('Retorna as propriedades corretas', async () => {
      const productItem = await salesService.findById(1);

      expect(productItem[1]).to.have.all.keys('productId', 'quantity', 'date');
    });
  });

});

describe('c_salesServ - Atualiza uma venda no BD', () => {
  describe('Situação 1-c_salesServ: É atualizada com sucesso', () => {
    const id = 10;
    const payload = [
        {
          productId: 1,
          quantity: 69,
        }
      ];

    before(() => {
      const resolve =   {
        saleId: 1,
        itemUpdated: [
          {
            productId: 1,
            quantity: 69
          }
        ]
      };

      sinon.stub(salesModel, 'update').resolves(resolve);
    });

    after(() => salesModel.update.restore());

    it('Retorna um object que não está vazio', async () => {
      const response = await salesService.update(id, payload);

      expect(response).to.be.an('object').that.is.not.empty;
    });

    it('Retorna as propriedades corretas', async () => {
      const response = await salesService.update(id, payload);

      expect(response).to.have.all.keys('saleId', 'itemUpdated');
    });
  });
});
