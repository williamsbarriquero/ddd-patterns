import SendEmailWhenProductIsCreatedHandler
  from '../product/handler/send-email-when-product-is-created.handler';
import EventDispatcher from './event-dispatcher';

describe('Domain events tests', () => {

  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('product.created.event', eventHandler);

    expect(
      eventDispatcher.eventHandlers['product.created.event'],
    ).toBeDefined();
    expect(
      eventDispatcher.eventHandlers['product.created.event'].length,
    ).toBe(1);
  });
});
