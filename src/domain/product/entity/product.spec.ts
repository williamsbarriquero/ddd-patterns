import Product from './product';

describe('Product unit tests', () => {

  it('should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'Product 1', 100);
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Product('123', '', 100);
    }).toThrowError('Name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => {
      new Product('123', 'Product 1', -100);
    }).toThrowError('Price must be greater than zero');
  });

  it('should change name', () => {
    const newProduct = new Product('123', 'Product 1', 100);
    newProduct.changeName('Product changed');
    expect(newProduct.name).toEqual('Product changed');
  });

  it('should change price', () => {
    const newProduct = new Product('123', 'Product 1', 100);
    newProduct.changePrice(150);
    expect(newProduct.price).toEqual(150);
  });
});
