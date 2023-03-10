const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

const { allProductsMock, productMock } = require('./mocks/productsModel.mock');

const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Testa o controller de products', () => {
  describe('Testa a função allProducts', () => {
    it('Testa o caso de sucesso', async () => {
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

  describe('Testa a função findById', () => {
    it('Testa o caso de sucesso', async () => {
      // Arrange
      const req = { params: { id: 1 }, body: {} };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findById').resolves({ type: null, message: productMock })
      // Act
      await productsController.findById(req, res);
  
      // Assert
      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(productMock)
    })

    it('Testa o caso de falha', async () => {
      // Arrange
      const req = { params: { id: 99 }, body: {} };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findById').resolves({ type: 404, message: 'Product not found' })
      // Act
      await productsController.findById(req, res);
  
      // Assert
      expect(res.status).to.have.been.calledWith(404)
      expect(res.json).to.have.been.calledWith({message: 'Product not found'})
    })
  })

  describe('Testa a função insert', () => {
    it('Testa o caso de sucesso', async () => {
      // Arrange
      const req = { body: {id: '', name: ''} };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productsService, 'insert').resolves(productMock)
      
      // Act
      await productsController.insert(req, res);
  
      // Assert
      expect(res.status).to.have.been.calledWith(201)
      expect(res.json).to.have.been.calledWith([{ id: 1, name: 'Martelo de Thor' }])

    })

    it('Testa o caso de sucesso', async () => {
      // Arrange
      const req = { body: {id: '', name: ''} };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productsService, 'insert').resolves({
        type: 422,
        message: "\"name\" length must be at least 5 characters long"
      })
      // Act
      await productsController.insert(req, res);
  
      // Assert
      expect(res.status).to.have.been.calledWith(422)
      expect(res.json).to.have.been.calledWith({
        type: 422,
        message: "\"name\" length must be at least 5 characters long"
      })

    })
  })

  describe('Testa a função updateById', () => {
    it('Testa o caso de sucesso', async () => {
      // Arrange
      const req = { params: { id: 1 }, body: { name: 'Martelo de Assis'} };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productsService, 'updateById').resolves({
        type: null,
        message: productMock[0]
      })
      
      // Act
      await productsController.updateById(req, res);
  
      // Assert
      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith({ id: 1, name: 'Martelo de Assis' })

    }) 
  })

  afterEach(() => {
    sinon.restore();
  })
})