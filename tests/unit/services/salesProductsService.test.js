const { expect } = require('chai');
const sinon = require('sinon');
const { salesProductsModel } =require('../../../src/models')
const { salesService, salesProductsService } = require('../../../src/services');

const { allSalesMock } = require('./mocks/salesModel.mock');

describe('Testa o service de salesProducts', function () {
  describe('Testa a função allSales', function () {
    it('Testa o caso de sucesso', async function () {
       // Arrange
      sinon.stub(salesProductsModel, 'allSales').resolves(allSalesMock)
      // Act
      const response = await salesProductsService.allSales();

      // Assert
      expect(response.type).to.be.equal(null)
      expect(response.message).to.be.deep.equal(allSalesMock)
    })
  });

  this.afterEach(() => {
    sinon.restore()
  })
})