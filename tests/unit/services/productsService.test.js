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

  describe('Testa a função findById', () => {
    it('Testa o caso de sucesso', async () => {
      // Arrange
      sinon.stub(productsModel, 'findById').resolves(productMock)
      // Act
      const response = await productsService.findById(1);
  
      // Assert
      expect(response.type).to.be.deep.equal(null)
      expect(response.message).to.be.deep.equal(productMock)
    })

    it('Testa o caso de falha', async () => {
      // Arrange
      sinon.stub(productsModel, 'findById').resolves(undefined)
      // Act
      const response = await productsService.findById(99);
  
      // Assert
      expect(response.type).to.be.equal(404)
      expect(response.message).to.be.deep.equal('Product not found')
  
    })
  })

  describe('Testa a função insert', () => {
    it('Testa o caso de sucesso', async () => {
      // Arrange
      sinon.stub(productsModel, 'insert').resolves([{ insertId: 1 }])
      // Act
      const response = await productsService.insert('Martelo de Thor');
  
      // Assert
      expect(response).to.be.deep.equal({ id: 5, name: 'Martelo de Thor' })
    })

    it('Testa o caso de falha (precisa ser string)', async () => {
      // Arrange
      sinon.stub(productsModel, 'insert').resolves([{ insertId: 1 }])
      // Act
      const response = await productsService.insert({ name:'Martelo de Thor' });
  
      // Assert
      expect(response.type).to.be.equal(400)
      expect(response.message).to.be.equal("\"name\" must be a string")
  
    })

    it('Testa o caso de falha (precisa ter pelo menos 5 caractéres)', async () => {
      // Arrange
      sinon.stub(productsModel, 'insert').resolves([{ insertId: 1 }])
      // Act
      const response = await productsService.insert('Thor');
  
      // Assert
      expect(response.type).to.be.equal(422)
      expect(response.message).to.be.equal("\"name\" length must be at least 5 characters long")
  
    })
  })

  this.afterEach(() => {
    sinon.restore()
  })
})