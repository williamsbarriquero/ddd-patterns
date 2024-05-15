import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'customers',
  timestamps: false,
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  public declare id: string;

  @Column({ allowNull: false })
  public declare name: string;

  @Column({ allowNull: false })
  public declare street: string;

  @Column({ allowNull: false })
  public declare number: number;

  @Column({ allowNull: false })
  public declare city: string;

  @Column({ allowNull: false })
  public declare zipcode: string;

  @Column({ allowNull: false })
  public declare active: boolean;

  @Column({ allowNull: false })
  public declare rewardPoints: number;

  public toJSON<T extends any>(): T {
    // @ts-ignore
    return super.toJSON();
  }

}
