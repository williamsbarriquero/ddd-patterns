import OrderItem from './order-item';

export default class Order {
  private readonly _id: string;
  private readonly _customerId: string;
  private _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  public validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._customerId.length === 0) {
      throw new Error('customerId is required');
    }
    if (this._items.length === 0) {
      throw new Error('Items are required');
    }
    if (this._items.some(item => item.quantity <= 0)) {
      throw new Error('Quantity must be greater than 0');
    }
  }

  public addItem(item: OrderItem): void {
    if (item === undefined) {
      throw new Error('item is required');
    }

    this._items = this._items.filter(x => x.id !== item.id);
    this._items.push(item);
  }

  public removeItem(item: OrderItem): void {
    this._items = this._items.filter(x => x !== item);
  }

  public total(): number {
    return this._items.reduce(
      (acc, item) => acc + item.orderItemTotal(), 0,
    );
  }
}
