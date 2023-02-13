const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allProductsMock, productMock } = require('./mocks/productsModel.mock');

describe('Testa o model de products', () => {
  describe('Testa a função allProducts', () => {
    it('Testa a função allProducts', async () => {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allProductsMock])
      // Act
      const response = await productsModel.allProducts();
  
      // Assert
      expect(response).to.be.deep.equal(allProductsMock)
  
    })
  })

  describe('Testa a função findById', () => {
    it('Testa o caso de sucesso', async () => {
      // Arrange
      sinon.stub(connection, 'execute').resolves([productMock])
      // Act
      const response = await productsModel.findById();
  
      // Assert
      expect(response).to.be.deep.equal(productMock[0])
  
    })
    
  })

  describe('Testa a função insert', () => {
    it('Testa o caso de sucesso', async () => {
      // Arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 1}])
      // Act
      const response = await productsModel.insert({id: 1, name: 'Martelo de Thor'});
  
      // Assert
      expect(response).to.be.equal(1)
  
    })
    
  })

  afterEach(() => {
    sinon.restore();
  })
})