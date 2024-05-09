import Product from '../entity/product';
import IRepositoryInterface from './repository-interface';

export default interface IProductRepositoryInterface
  extends IRepositoryInterface<Product> {
}
