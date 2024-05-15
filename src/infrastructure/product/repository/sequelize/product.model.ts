import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: false,
})
export default class ProductModel extends Model {

  @PrimaryKey
  @Column
  public declare id: string;

  @Column({ allowNull: false })
  public declare name: string;

  @Column({ allowNull: false })
  public declare price: number;
}
