import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
import OrderItemModel from './order-item.model';

@Table({
  tableName: 'orders',
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  public declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  public declare customerId: string;

  @BelongsTo(() => CustomerModel)
  public declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  public declare items: OrderItemModel[];

  @Column({ allowNull: false })
  public declare total: number;

  public toJSON<T extends any>(): T {
    // @ts-ignore
    return super.toJSON();
  }
}
