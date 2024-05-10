import IEventDispatcherInterface from './event-dispatcher.interface';
import IEventHandlerInterface from './event-handler.interface';
import IEventInterface from './event.interface';

export default class EventDispatcher implements IEventDispatcherInterface {

  private _eventHandlers: { [eventName: string]: IEventHandlerInterface[] } = {};

  get eventHandlers(): { [eventName: string]: IEventHandlerInterface[] } {
    return this._eventHandlers;
  }

  public notify(event: IEventInterface): void {

  }

  public register(eventName: string, eventHandler: IEventHandlerInterface): void {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }

    this._eventHandlers[eventName].push(eventHandler);
  }

  public unregister(eventName: string, eventHandler: IEventHandlerInterface): void {
  }

  public unregisterAll(): void {
  }

}
