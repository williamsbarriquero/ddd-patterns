import EventDispatcher from '../../../@shared/event/event-dispatcher';
import Customer from '../../entity/customer';
import Address from '../../value-object/address';
import CustomerAddressChangedEvent from '../customer-address-changed.event';
import SendConsoleLog1Handler from './send-console-log-1.handler';
import SendConsoleLogHandler from './send-console-log.handler';

describe('CustomerAddressChanged event test', () => {

  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    expect(
      eventDispatcher.eventHandlers.CustomerAddressChangedEvent,
    ).toBeDefined();
    expect(
      eventDispatcher.eventHandlers.CustomerAddressChangedEvent.length,
    ).toBe(1);
    expect(
      eventDispatcher.eventHandlers.CustomerAddressChangedEvent[0],
    ).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    expect(
      eventDispatcher.eventHandlers.CustomerAddressChangedEvent[0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister('CustomerAddressChangedEvent', eventHandler);

    expect(
      eventDispatcher.eventHandlers.CustomerAddressChangedEvent,
    ).toBeDefined();
    expect(
      eventDispatcher.eventHandlers.CustomerAddressChangedEvent.length,
    ).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);
    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    expect(
      eventDispatcher.eventHandlers.CustomerAddressChangedEvent[0],
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.eventHandlers.CustomerAddressChangedEvent[1],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.eventHandlers.CustomerAddressChangedEvent,
    ).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    expect(
      eventDispatcher.eventHandlers.CustomerAddressChangedEvent[0],
    ).toMatchObject(eventHandler);

    const address = new Address('Street 1', 1, '1', 'City 1');
    const customer = new Customer('1', 'Customer 1');
    customer.changeAddress(address);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(customer);

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
