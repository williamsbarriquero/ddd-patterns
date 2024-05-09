import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import OrderItem from '../../../../domain/entity/order-item';
import OrderModel from './order.model';
import ProductModel from './product.model';

@Table({
  tableName: 'order_items',
  timestamps: false,
})
export default class OrderItemModel extends Model<OrderItem> {
  @PrimaryKey
  @Column
  public declare id: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  public declare orderId: string;

  public declare order: OrderModel;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  public declare productId: string;

  @BelongsTo(() => ProductModel)
  public declare product: ProductModel;

  @Column({ allowNull: false })
  public declare quantity: number;

  @Column({ allowNull: false })
  public declare name: string;

  @Column({ allowNull: false })
  public declare price: number;
}
