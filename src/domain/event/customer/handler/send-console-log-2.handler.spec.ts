import EventDispatcher from '../../@shared/event-dispatcher';
import CustomerCreatedEvent from '../customer-created.event';
import SendConsoleLog2Handler from './send-console-log-2.handler';

describe('Customer Created Send Console Log 2 events tests', () => {

  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog2Handler();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler);

    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent,
    ).toBeDefined();
    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent.length,
    ).toBe(1);
    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent[0],
    ).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog2Handler();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler);

    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent[0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister('CustomerCreatedEvent', eventHandler);

    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent,
    ).toBeDefined();
    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent.length,
    ).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog2Handler();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler);

    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent[0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent,
    ).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', eventHandler);

    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent[0],
    ).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent(
      {
        name: 'Customer 2 created',
        description: 'Customer 2 created description',
        price: 100,
      },
    );

    // Quando o notify for executado
    // o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
