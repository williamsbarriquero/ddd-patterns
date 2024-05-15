import IEventHandlerInterface from '../../../@shared/event/event-handler.interface';
import CustomerAddressChangedEvent from '../customer-address-changed.event';

export default class SendConsoleLogHandler
  implements IEventHandlerInterface<CustomerAddressChangedEvent> {
  public handle(event: CustomerAddressChangedEvent): void {

    const customerAddress = event.eventData.address;
    const customerId = event.eventData.id;
    const customerName = event.eventData.name;
    // tslint:disable-next-line:no-console
    console.log(
      `Customer address [${customerId} - ${customerName}] changed to: ${customerAddress}`,
    );
  }
}
