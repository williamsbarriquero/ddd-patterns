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
    expect(
      eventDispatcher.eventHandlers['product.created.event'][0],
    ).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('product.created.event', eventHandler);

    expect(
      eventDispatcher.eventHandlers['product.created.event'][0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister('product.created.event', eventHandler);

    expect(
      eventDispatcher.eventHandlers['product.created.event'],
    ).toBeDefined();
    expect(
      eventDispatcher.eventHandlers['product.created.event'].length,
    ).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('product.created.event', eventHandler);
    eventDispatcher.register('product.created.event', eventHandler);
    eventDispatcher.register('product.updated.event', eventHandler);

    expect(
      eventDispatcher.eventHandlers['product.created.event'][0],
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.eventHandlers['product.created.event'][1],
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.eventHandlers['product.updated.event'][0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.eventHandlers['product.created.event'],
    ).toBeUndefined();
    expect(
      eventDispatcher.eventHandlers['product.updated.event'],
    ).toBeUndefined();
  });
});
