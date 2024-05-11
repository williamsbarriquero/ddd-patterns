import IEventHandlerInterface from '../../@shared/event-handler.interface';
import CustomerCreatedEvent from '../customer-created.event';

export default class SendConsoleLogHandler
  implements IEventHandlerInterface<CustomerCreatedEvent> {
  public handle(event: CustomerCreatedEvent): void {

    const customerAddress = event.eventData.address;
    const customerId = event.eventData.id;
    const customerName = event.eventData.name;
    // tslint:disable-next-line:no-console
    console.log(
      `Customer address [${customerId} - ${customerName}] changed to: ${customerAddress}`,
    );
  }
}
