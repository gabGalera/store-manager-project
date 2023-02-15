const { expect } = require('chai');
const sinon = require('sinon');
const { salesProductsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allSalesMock, mockInsertId } = require('./mocks/salesModel.mock');

describe('Testa o model de salesProducts', () => {
  describe('Testa a função allSales', () => {
    it('Testa a função allSales', async () => {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allSalesMock])
      // Act
      const response = await salesProductsModel.allSales();
  
      // Assert
      expect(response).to.be.deep.equal(allSalesMock)
  
    })

    it('Testa a função findById', async () => {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allSalesMock[0]])
      // Act
      const response = await salesProductsModel.findById();
  
      // Assert
      expect(response).to.be.deep.equal(allSalesMock[0])
  
    })

    it('Testa a função delete', async () => {
      // Arrange
      sinon
        .stub(connection, 'execute')
        .onFirstCall()
        .resolves()
        .onSecondCall()
        .resolves([[]])
      
      // Act
      await salesProductsModel.deleteSaleProduct(1);
      const response = await salesProductsModel.findById(1)
  
      // Assert
      expect(response.length).to.be.equal(0)
  
    })

    it('Testa a função update', async () => {
      // Arrange
      sinon
        .stub(connection, 'execute')
        .resolves()
      
      // Act
      await salesProductsModel.updateSaleProduct(1,
      [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
        ]
      );

      sinon.restore()

      sinon
        .stub(connection, 'execute')
        .resolves(
          [[{
            "saleId": 1,
            "date": "2023-02-14T17:32:14.000Z",
            "productId": 1,
            "quantity": 10
          },
          {
            "saleId": 1,
            "date": "2023-02-14T17:32:14.000Z",
            "productId": 2,
            "quantity": 50
          }]]
        )
      
      const response = await salesProductsModel.findById(1)
          console.log(response)
      // Assert
      expect(response.length).to.be.equal(2)
  
    })
  })

  afterEach(() => {
    sinon.restore();
  })
})