import Address from './address';
import Customer from './customer';

describe('Customer unit tests', () => {

  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'Jhon');
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('123', '');
    }).toThrowError('Name is required');
  });

  it('should change name', () => {
    const customer = new Customer('123', 'Jhon');
    customer.changeName('Jane');

    expect(customer.name).toEqual('Jane');
  });

  it('should activate customer', () => {
    const customer = new Customer('123', 'Jhon');
    const address = new Address('Rua Um', 2, '54780-455', 'Camaragibe');
    customer.changeAddress(address);
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = new Customer('123', 'Jhon');
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when address is undefines when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('123', 'Jhon');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });
});
