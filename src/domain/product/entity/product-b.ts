import IProductInterface from './product.interface';

export default class ProductB implements IProductInterface {
  private readonly _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price * 2;
  }

  public validate() {
    if (this._id === '') {
      throw new Error('Id is required');
    }
    if (this._name === '') {
      throw new Error('Name is required');
    }
    if (this._price <= 0) {
      throw new Error('Price must be greater than zero');
    }
  }

  public changeName(name: string) {
    this._name = name;
    this.validate();
  }

  public changePrice(price: number) {
    this._price = price;
    this.validate();
  }
}
