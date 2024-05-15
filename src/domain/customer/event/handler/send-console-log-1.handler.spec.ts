import EventDispatcher from '../../../@shared/event/event-dispatcher';
import CustomerCreatedEvent from '../customer-created.event';
import SendConsoleLog1Handler from './send-console-log-1.handler';

describe('Customer Created Send Console Log 1 events tests', () => {

  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();

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
    const eventHandler = new SendConsoleLog1Handler();

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
    const eventHandler = new SendConsoleLog1Handler();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler);

    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent[0],
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent[1],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent,
    ).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', eventHandler);

    expect(
      eventDispatcher.eventHandlers.CustomerCreatedEvent[0],
    ).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent(
      {
        name: 'Customer created',
        description: 'Customer created description',
        price: 100,
      },
    );

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
