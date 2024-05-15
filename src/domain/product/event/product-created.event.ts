import IEventInterface from '../../@shared/event/event.interface';

export default class ProductCreatedEvent implements IEventInterface {
  public readonly dataTimeOccurred: Date;
  public readonly eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
