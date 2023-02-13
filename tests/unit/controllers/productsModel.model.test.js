const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allProductsMock, productMock } = require('./mocks/products.model.mock');

describe('Testa o model de products', () => {
  it('Testa a função allProducts', async () => {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allProductsMock])
    // Act
    const response = await productsModel.allProducts();

    // Assert
    expect(response).to.be.deep.equal(allProductsMock)

  })
})