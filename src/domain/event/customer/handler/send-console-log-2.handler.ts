import IEventHandlerInterface from '../../@shared/event-handler.interface';
import CustomerCreatedEvent from '../customer-created.event';

export default class SendConsoleLog2Handler
  implements IEventHandlerInterface<CustomerCreatedEvent> {
  public handle(event: CustomerCreatedEvent): void {
    // tslint:disable-next-line:no-console
    console.log(
      `This is the second console.log of the event: ${event.constructor.name}`,
    );
  }
}
