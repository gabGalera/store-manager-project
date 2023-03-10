const allSalesMock = [
  {
    "saleId": 1,
    "date": "2023-02-14T17:32:14.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-14T17:32:14.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-14T17:32:14.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const mockInsertId = [{insertId: 3}]

const mockSale = [{
    "saleId": 1,
    "date": "2023-02-14T17:32:14.000Z",
    "productId": 1,
    "quantity": 5
  }]

const mockBody = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const mockItemsSold = [
  {
    "saleId": 1,
    "date": "2023-02-14T17:32:14.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-14T17:32:14.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-14T17:32:14.000Z",
    "productId": 3,
    "quantity": 15
  }
]
module.exports = {
  allSalesMock,
  mockInsertId,
  mockSale,
  mockBody,
}