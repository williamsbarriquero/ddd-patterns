import IEventHandlerInterface from './event-handler.interface';
import IEventInteface from './event.interface';

export default interface IEventDispatcherInterface {
  notify(event: IEventInteface): void;

  register(eventName: string, eventHandler: IEventHandlerInterface): void;

  unregister(eventName: string, eventHandler: IEventHandlerInterface): void;

  unregisterAll(): void;
}
