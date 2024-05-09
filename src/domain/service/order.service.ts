import { v4 as uuid } from 'uuid';
import Customer from '../entity/customer';
import Order from '../entity/order';
import OrderItem from '../entity/order-item';

export default class OrderService {

  public static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order mist have at least one item');
    }

    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }

  public static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}
