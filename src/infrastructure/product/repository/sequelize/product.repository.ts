import Product from '../../../../domain/product/entity/product';
import IProductRepositoryInterface from '../../../../domain/product/repository/product-repository.interface';
import ProductModel from './product.model';

export default class ProductRepository implements IProductRepositoryInterface {

  public async create(entity: Product): Promise<void> {
    await ProductModel.create(
      {
        id: entity.id,
        name: entity.name,
        price: entity.price,
      });
  }

  public async update(entity: Product): Promise<void> {
    await ProductModel.update(
      { name: entity.name, price: entity.price },
      {
        returning: true,
        where: {
          id: entity.id,
        },
      },
    );
  }

  public async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne(
      {
        where: { id },
      });

    return new Product(
      productModel.id,
      productModel.name,
      productModel.price,
    );
  }

  public async findAll(): Promise<Product[]> {
    const productModel = await ProductModel.findAll();
    return productModel.map(product => new Product(
      product.id,
      product.name,
      product.price,
    ));
  }
}
