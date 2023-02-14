const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');

const { allProductsMock, productMock } = require('./mocks/productsModel.mock');

const sinonChai = require('sinon-chai');
const { allSalesMock } = require('./mocks/salesModel.mock');

chai.use(sinonChai);

describe('Testa o controller de sales', () => {
  describe('Testa a função newSale', () => {
    it('Testa o caso de sucesso', async () => {
       // Arrange
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(salesService, 'findAll').resolves({
        type: null,
        message: allSalesMock
      })
      sinon.stub(salesService, 'insertSaleProduct').resolves(
        {
          type: null,
          message: {
            id: 3,
            itemsSold: [
              {
                productId: 1,
                quantity: 1
              },
              {
                productId: 2,
                quantity: 5
              }
            ]
          }
        }
      )
      // Act
      await salesController.newSale(req, res);
      
      // Assert
      expect(res.status).to.have.been.calledWith(201)
      expect(res.json).to.have.been.calledWith({
        id: 3,
        itemsSold: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]
      })
    })

    it('Testa o caso de falha', async () => {
       // Arrange
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(salesService, 'findAll').resolves({
        type: null,
        message: allSalesMock
      })
      sinon.stub(salesService, 'insertSaleProduct').resolves(
        { type: 400, message: '"productId" is required' }
      )
      // Act
      await salesController.newSale(req, res);
      
      // Assert
      expect(res.status).to.have.been.calledWith(400)
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' })
    })
  });

  afterEach(() => {
    sinon.restore();
  })
})