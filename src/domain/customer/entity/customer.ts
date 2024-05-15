import Address from '../value-object/address';

export default class Customer {

  private readonly _id: string;
  private _name: string = '';
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  public isActive(): boolean {
    return this._active;
  }

  public validate() {
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }

    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
  }

  public changeName(name: string) {
    this._name = name;
    this.validate();
  }

  public changeAddress(address: Address) {
    this._address = address;
  }

  public activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  public deactivate() {
    this._active = false;
  }

  public addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
