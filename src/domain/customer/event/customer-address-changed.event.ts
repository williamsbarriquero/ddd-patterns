import IEventInterface from '../../@shared/event/event.interface';

export default class CustomerAddressChangedEvent implements IEventInterface {
  public readonly eventData: any;
  public readonly dataTimeOccurred: Date;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
