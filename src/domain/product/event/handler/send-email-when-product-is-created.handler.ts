import IEventHandlerInterface from '../../../@shared/event/event-handler.interface';
import ProductCreatedEvent from '../product-created.event';

export default class SendEmailWhenProductIsCreatedHandler
  implements IEventHandlerInterface<ProductCreatedEvent> {

  public handle(event: ProductCreatedEvent): void {
    // tslint:disable-next-line:no-console
    console.log('Sending email ...');
  }
}
