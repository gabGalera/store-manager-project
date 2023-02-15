const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { salesController, salesProductsController } = require('../../../src/controllers');
const { salesService, salesProductsService, productsService } = require('../../../src/services');

const { allProductsMock, productMock } = require('./mocks/productsModel.mock');

const sinonChai = require('sinon-chai');
const { allSalesMock, mockSale, mockBody } = require('./mocks/salesModel.mock');

chai.use(sinonChai);

describe('Testa o controller de sales', () => {
  describe('Testa a função allSales', () => {
    it('Testa o caso de sucesso', async () => {
       // Arrange
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(salesProductsService, 'allSales').resolves({
        type: null,
        message: allSalesMock
      })
      // Act
      await salesProductsController.allSales(req, res);
      
      // Assert
      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(allSalesMock)
    })

  });

  describe('Testa a função findById', () => {
    it('Testa o caso de sucesso', async () => {
       // Arrange
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(salesProductsService, 'findById').resolves({
        type: null,
        message: mockSale
      })
      // Act
      await salesProductsController.findById(req, res);
      
      // Assert
      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(mockSale)
    })
  });

  describe('Testa a função updateSale', () => {
    it('Testa o caso de sucesso', async () => {
       // Arrange
      const req = { params: { id: 1 }, body: mockBody };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productsService, 'allProducts').resolves(allProductsMock)
      sinon.stub(salesProductsService, 'updateSaleProduct').resolves({
        type: null,
        message: ''
      })
      // Act
      await salesProductsController.updateSale(req, res);
      
      // Assert
      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith({
        saleId: 1,
        itemsUpdated: mockBody
      })
    })
  });

  afterEach(() => {
    sinon.restore();
  })
})