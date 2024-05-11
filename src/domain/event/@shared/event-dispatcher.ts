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
    if (this._eventHandlers[eventName]) {
      const index = this._eventHandlers[eventName].indexOf(eventHandler);

      if (index !== -1) {
        this._eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  public unregisterAll(): void {
    this._eventHandlers = {};
  }

}
