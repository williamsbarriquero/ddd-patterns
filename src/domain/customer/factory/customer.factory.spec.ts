import Address from '../value-object/address';
import CustomerFactory from './customer.factory';

describe('Customer factory unit tests', () => {

  it('should create a customer type a', () => {

    const customer = CustomerFactory.create('Williams');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Williams');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with an address', () => {

    const address = new Address(
      'Main St.',
      123,
      '54780-455',
      'New York',
    );
    const customer = CustomerFactory.createWithAddress('Williams', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Williams');
    expect(customer.address).toBe(address);
  });
});
