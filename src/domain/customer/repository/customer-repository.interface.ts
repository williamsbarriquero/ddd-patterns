import IRepositoryInterface from '../../@shared/repository/repository-interface';
import Customer from '../entity/customer';

export default interface ICustomerRepositoryInterface
  extends IRepositoryInterface<Customer> {
}
