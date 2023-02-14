const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } =require('../../../src/models')
const { salesService } = require('../../../src/services');
const { allProductsMock } = require('./mocks/productsModel.mock');

const { allSalesMock, mockSale, mockBody, mockInsertId } = require('./mocks/salesModel.mock');

describe('Testa o service de sales', function () {
  describe('Testa a função findAll', function () {
    it('Testa o caso de sucesso', async function () {
       // Arrange
      sinon.stub(salesModel, 'findAll').resolves(allSalesMock)
      // Act
      const response = await salesService.findAll();
  
      // Assert
      expect(response.type).to.be.equal(null)
      expect(response.message).to.be.deep.equal(allSalesMock)
    })
  });

  describe('Testa a função insertSale', function () {
    it('Testa o caso de sucesso', async function () {
       // Arrange
      sinon.stub(salesModel, 'insertSale').resolves(mockSale)
      // Act
      const response = await salesService.insertSale(allSalesMock);
  
      // Assert
      expect(response.type).to.be.equal(null)
      expect(response.message).to.be.deep.equal(mockSale)
    })
  });

  describe('Testa a função insertSaleProduct', function () {
    it('Testa o caso de sucesso ', async function () {
       // Arrange
      sinon.stub(salesModel, 'insertSale').resolves(3)
      sinon.stub(salesModel, 'insertSaleProduct').resolves(
        {
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
      )

      // Act
      const response = await salesService.insertSaleProduct(allSalesMock, mockBody, allProductsMock);
  
      // Assert
      expect(response.type).to.be.equal(null)
      expect(response.message).to.be.deep.equal({
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
      })
    })

    it('Testa o caso de falha 1 ', async function () {
      // Act
      const response = await salesService.insertSaleProduct(
        allSalesMock,
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
      expect(response.message).to.be.deep.equal('"productId" is required')
    })

    it('Testa o caso de falha 2 ', async function () {
      // Act
      const response = await salesService.insertSaleProduct(
        allSalesMock,
        [
          { 
            "productId": 1,
            "": 1
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
      expect(response.message).to.be.deep.equal('"quantity" is required')
    })

    it('Testa o caso de falha 3 ', async function () {
      // Act
      const response = await salesService.insertSaleProduct(
        allSalesMock,
        [
          { 
            "productId": 1,
            "quantity": 0
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ],
        allProductsMock
      );
  
      // Assert
      expect(response.type).to.be.equal(422)
      expect(response.message).to.be.deep.equal('"quantity" must be greater than or equal to 1')
    })

    it('Testa o caso de falha 4 ', async function () {
      // Act
      const response = await salesService.insertSaleProduct(
        allSalesMock,
        [
          { 
            "productId": 0,
            "quantity": 3
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ],
        {message: allProductsMock}
      );
  
      // Assert
      expect(response.type).to.be.equal(404)
      expect(response.message).to.be.deep.equal('Product not found')
    })
  });

  this.afterEach(() => {
    sinon.restore()
  })
})