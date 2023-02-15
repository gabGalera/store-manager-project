const { expect } = require('chai');
const sinon = require('sinon');
const { salesProductsModel } =require('../../../src/models')
const { salesService, salesProductsService } = require('../../../src/services');
const { allProductsMock } = require('./mocks/productsModel.mock');

const { allSalesMock, mockSale, mockBody } = require('./mocks/salesModel.mock');

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

  describe('Testa a função findById', function () {
    it('Testa o caso de sucesso', async function () {
       // Arrange
      sinon.stub(salesProductsModel, 'findById').resolves([allSalesMock[2]])
      // Act
      const response = await salesProductsService.findById(2);

      // Assert
      expect(response.type).to.be.equal(null)
      expect(response.message.length).to.be.equal(1)
    })

    it('Testa o caso de falha', async function () {
       // Arrange
      sinon.stub(salesProductsModel, 'findById').resolves([])
      // Act
      const response = await salesProductsService.findById(20);

      // Assert
      expect(response.type).to.be.equal(404)
      expect(response.message).to.be.equal('Sale not found')
    })
  });

  describe('Testa a função update', function () {
    it('Testa o caso de sucesso', async function () {
       // Arrange
      sinon.stub(salesProductsModel, 'findById').resolves(mockSale)
      // Act
      const response = await salesProductsService.updateSaleProduct(1, mockBody, allProductsMock);

      // Assert
      expect(response.type).to.be.equal(null)
      expect(response.message).to.be.equal('')
    })
    
    it('Testa o caso de falha 1', async function () {
       // Arrange
      sinon.stub(salesProductsModel, 'findById').resolves([])
      // Act
      const response = await salesProductsService.updateSaleProduct(2);

      // Assert
      expect(response.type).to.be.equal(404)
      expect(response.message).to.be.equal('Sale not found')
    })

    it('Testa o caso de falha 2', async function () {
       // Arrange
      sinon.stub(salesProductsModel, 'findById').resolves(mockSale)
      // Act
      const response = await salesProductsService.updateSaleProduct(
        2,
      [
        {
          "": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
        ],
      allProductsMock
      );

      // Assert
      expect(response.type).to.be.equal(400)
      expect(response.message).to.be.equal('"productId" is required')
    })


    
  });

  this.afterEach(() => {
    sinon.restore()
  })
})