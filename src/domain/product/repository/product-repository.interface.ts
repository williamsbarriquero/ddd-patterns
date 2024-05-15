import IRepositoryInterface from '../../@shared/repository/repository-interface';
import Product from '../entity/product';

export default interface IProductRepositoryInterface
  extends IRepositoryInterface<Product> {
}
