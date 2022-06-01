const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('a_salesModel - Consulta todas as vendas do BD', () => {
  describe('Situação 1-a_salesModel: Não existem vendas cadastradas no BD', () => {
    before(() => {
      const resolve = [[]];

      sinon.stub(connection, 'execute').resolves(resolve);
    });

    after(() => connection.execute.restore());

    it('Retorna um array vazio', async () => {
      const response = await salesModel.getAll();

      expect(response).to.be.an('array').that.is.empty;
    });
  });

  describe('Situação 2-a_salesModel: Existem vendas cadastradas no BD', () => {
    before(() => {
      const resolve = [
        [
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
        ]
      ];

      sinon.stub(connection, 'execute').resolves(resolve);
    });

    after(() => connection.execute.restore());

    it('Retorna um array que não está vazio', async () => {
      const response = await salesModel.getAll();

      expect(response).to.be.an('array').that.is.not.empty;
    });

    it('Retorna um array com dois objetos dos produtos e suas propriedades', async () => {
      const response = await salesModel.getAll();

      expect(response).to.have.lengthOf(2);
      expect(response[0]).to.be.an('object').that.has.all.keys('saleId', 'date', 'productId', 'quantity');
    });

    it('Retorna os produtos corretos', async () => {
      const response = await salesModel.getAll();

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

describe('b_salesModel - Busca apenas uma venda do BD por seu ID', () => {
  describe('Situação 1-b_salesModel: Não existe uma venda com o ID informado', () => {
    before(() => {
      const resolve = [[]];

      sinon.stub(connection, 'execute').resolves(resolve);
    });

    after(() => connection.execute.restore());

    it('Retorna null', async () => {
      const response = await salesModel.findById();

      expect(response).to.be.null;
    });
  });

  describe('Situação 2-b_salesModel: Existe uma venda com o ID informado', () => {
    before(() => {
      const resolve = [
        {
          productId: 1,
          quantity: 2,
          date: "2021-09-09T04:54:29.000Z",
        }
      ];

      sinon.stub(connection, 'execute').resolves(resolve);
    });

    after(() => connection.execute.restore());

    it('Retorna um object que não está vazio', async () => {
      const response = await salesModel.findById(1);

      expect(response).to.be.an('object').that.is.not.empty;
    });

    it('Retorna as propriedades corretas', async () => {
      const response = await salesModel.findById(1);

      expect(response).to.have.all.keys('productId', 'quantity', 'date');
    });
  });

});

describe('d_salesModel - Adiciona uma nova venda no BD', () => {
  describe('Situação 1-d_salesModel: É inserida com sucesso', () => {
    const payload = {
        productId: 1,
        quantity: 50
      };

    before(() => {
      const resolve = [{ insertId: 1 }];

      sinon.stub(connection, 'execute').resolves(resolve);
    });

    after(() => connection.execute.restore());

    it('Retorna um array que não está vazio', async () => {
      const response = await salesModel.create(payload);

      expect(response).to.be.an('array').that.is.not.empty;
    });

    it('Retorna as propriedades corretas', async () => {
      const [response] = await salesModel.create(payload);

      expect(response).to.have.property('insertId');
    });
  });

});

describe('e_salesModel - Atualiza uma venda no BD', () => {
  describe('Situação 1-e_salesModel: É atualizado com sucesso', () => {
    const id = 1;
    const quantity = 32;

    before(() => {
      const resolve = [
        {
          saleId: 1,
          itemUpdated: [
            {
              productId: 1,
              quantity: 32
            }
          ]
        }
      ];

      sinon.stub(connection, 'execute').resolves(resolve);
    });

    after(() => connection.execute.restore());

    it('Retorna um object que não está vazio', async () => {
      const [response] = await salesModel.update(id, quantity);

      expect(response).to.be.an('object').that.is.not.empty;
    });

    it('Retorna as propriedades corretas', async () => {
      const [response] = await salesModel.update(id, quantity);

      expect(response).to.have.all.keys('saleId', 'itemUpdated');
    });
  });
});

describe('f_salesModel - Remove uma venda no BD', () => {
  describe('Situação 1-f_salesModel: É removido com sucesso', () => {
    const id = 1;

    before(() => sinon.stub(connection, 'execute').resolves([[]]));

    after(() => connection.execute.restore());

    it('Retorna um array que está vazio', async () => {
      const [response] = await salesModel.remove(id);

      expect(response).to.be.an('array').that.is.empty;
    });
  });
});
