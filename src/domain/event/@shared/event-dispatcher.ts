import IEventDispatcherInterface from './event-dispatcher.interface';
import IEventHandlerInterface from './event-handler.interface';
import IEventInterface from './event.interface';

export default class EventDispatcher implements IEventDispatcherInterface {
  public notify(event: IEventInterface): void {

  }

  public register(eventName: string, eventHandler: IEventHandlerInterface): void {
  }

  public unregister(eventName: string, eventHandler: IEventHandlerInterface): void {
  }

  public unregisterAll(): void {
  }

}
