import IEventInteface from './event.interface';

export default interface IEventHandlerInterface<T extends IEventInteface = IEventInteface> {
  handle(event: T): void;
}
