import IEventHandlerInterface from './event-handler.interface';
import IEventInterface from './event.interface';

export default interface IEventDispatcherInterface {
  notify(event: IEventInterface): void;

  register(eventName: string, eventHandler: IEventHandlerInterface): void;

  unregister(eventName: string, eventHandler: IEventHandlerInterface): void;

  unregisterAll(): void;
}
