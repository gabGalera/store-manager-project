const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

const { allProductsMock, productMock } = require('./mocks/productsModel.mock');

const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Testa o controller de products', function () {
  describe('Testa a função allProducts', function () {
    it('Testa o caso de sucesso', async function () {
       // Arrange
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productsService, 'allProducts').resolves({
        type: null,
        message: allProductsMock
      })
      // Act
      await productsController.allProducts(req, res);
  
      // Assert
      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(allProductsMock)
    })
  });
})