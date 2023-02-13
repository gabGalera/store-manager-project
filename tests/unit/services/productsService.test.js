const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } =require('../../../src/models')
const { productsService } = require('../../../src/services');

const { allProductsMock, productMock } = require('./mocks/productsModel.mock');

describe('Testa o service de products', function () {
  describe('Testa a função allProducts', function () {
    it('Testa o caso de sucesso', async function () {
       // Arrange
      sinon.stub(productsModel, 'allProducts').resolves(allProductsMock)
      // Act
      const response = await productsService.allProducts();
  
      // Assert
      expect(response.type).to.be.equal(null)
      expect(response.message).to.be.deep.equal(allProductsMock)
    })
  });
})