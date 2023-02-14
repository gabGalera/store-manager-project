const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allSalesMock, mockInsertId } = require('./mocks/salesModel.mock');

describe('Testa o model de sales', () => {
  describe('Testa a função findAll', () => {
    it('Testa a função findAll', async () => {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allSalesMock])
      // Act
      const response = await salesModel.findAll();
  
      // Assert
      expect(response).to.be.deep.equal(allSalesMock)
  
    })
  })

  it('Testa a função insertSale', async () => {
    // Arrange
    sinon.stub(connection, 'execute').resolves(mockInsertId)
    
    // Act
    const response = await salesModel.insertSale(allSalesMock);

    // Assert
    expect(response).to.be.equal(3)
  
  })
  
  it('Testa a função insertSaleProduct', async () => {
    // Arrange
    sinon.stub(connection, 'execute').resolves(mockInsertId)
    
    // Act
    const response = await salesModel.insertSale(3, allSalesMock);

    // Assert
    expect(response).to.be.equal(3)
  
    })

  afterEach(() => {
    sinon.restore();
  })
})