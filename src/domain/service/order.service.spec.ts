import OrderItem from '../entity/order-item';
import Order from '../entity/order';
import OrderService from './order.service';
import Customer from '../entity/customer';

describe('Order service unit tests', () => {

  it('should place an order', () => {
    const customer = new Customer('customer 1', 'customer');
    const item1 =
      new OrderItem('i1', 'Item 1', 10, 'p1', 2);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(10);
    expect(order.total()).toBe(20);
  });

  it('should get total of all orders', () => {
    const item1 = new OrderItem('i1', 'Item 1', 100, 'p1', 2);
    const item2 = new OrderItem('i2', 'Item 2', 200, 'p2', 2);

    const order1 = new Order('o1', 'c1', [item1]);
    const order2 = new Order('o2', 'c1', [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(600);
  });

  it('should add reward points', () => {
    const customer = new Customer('c1', 'Customer');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });
});