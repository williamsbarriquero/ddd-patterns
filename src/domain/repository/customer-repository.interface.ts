import Customer from '../entity/customer';
import IRepositoryInterface from './repository-interface';

export default interface ICustomerRepositoryInterface
  extends IRepositoryInterface<Customer> {
}
