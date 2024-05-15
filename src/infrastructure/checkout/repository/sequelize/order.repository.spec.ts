import { Sequelize } from 'sequelize-typescript';
import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order-item';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import Product from '../../../../domain/product/entity/product';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import ProductModel from '../../../product/repository/sequelize/product.model';
import ProductRepository from '../../../product/repository/sequelize/product.repository';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';
import OrderRepository from './order.repository';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize(
      {
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true },
      },
    );

    sequelize.addModels(
      [
        CustomerModel,
        OrderItemModel,
        ProductModel,
        OrderModel,
      ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne(
      {
        where: { id: order.id },
        include: ['items'],
      },
    );

    expect(orderModel.toJSON()).toStrictEqual(
      {
        id: '123',
        customerId: '123',
        total: order.total(),
        items: [
          {
            id: orderItem.id,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            orderId: '123',
            productId: '123',
          },
        ],
      },
    );
  });

  it('should update a order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne(
      {
        where: { id: order.id },
        include: ['items'],
      });

    expect(orderModel.toJSON()).toStrictEqual(
      {
        id: '123',
        customerId: '123',
        total: order.total(),
        items: [
          {
            id: orderItem.id,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            orderId: '123',
            productId: '123',
          },
        ],
      });

    const newProduct = new Product('456', 'Product 2', 20);
    await productRepository.create(newProduct);

    const newOrderItem = new OrderItem(
      '2',
      newProduct.name,
      newProduct.price,
      newProduct.id,
      2,
    );

    order.addItem(newOrderItem);
    await orderRepository.update(order);

    const updatedOrderModel = await OrderModel.findOne(
      {
        where: { id: order.id },
        include: ['items'],
      });
    expect(updatedOrderModel.toJSON()).toStrictEqual(
      {
        id: '123',
        customerId: '123',
        total: order.total(),
        items: [
          {
            id: orderItem.id,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            orderId: '123',
            productId: '123',
          },
          {
            id: newOrderItem.id,
            name: newOrderItem.name,
            price: newOrderItem.price,
            quantity: newOrderItem.quantity,
            orderId: '123',
            productId: '456',
          },
        ],
      });
  });

  it('should update a order adding a new order item', async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, '1', 'City 1');
    customer.changeAddress(address);

    const product1 = new Product('1', 'Product 1', 10);

    const orderItem1 = new OrderItem(
      '1',
      product1.name,
      product1.price,
      product1.id,
      10,
    );

    const order1 = new Order('1', '1', [orderItem1]);

    await customerRepository.create(customer);
    await productRepository.create(product1);
    await orderRepository.create(order1);

    const createdOrderModel = await OrderModel.findOne(
      {
        where: {
          id: order1.id,
        },
        include: ['items'],
      });

    expect(createdOrderModel.toJSON()).toStrictEqual(
      {
        id: '1',
        customerId: '1',
        items: [
          {
            id: '1',
            name: 'Product 1',
            orderId: '1',
            price: 10,
            productId: '1',
            quantity: 10,
          },
        ],
        total: 100,
      });

    // Act
    // Create a new Product
    const product2 = new Product('2', 'Product 2', 20);
    await productRepository.create(product2);

    // Create a new OrderItem
    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      20,
    );

    // Update Order1 adding a new OrderItem
    order1.addItem(orderItem2);

    await orderRepository.update(order1);

    const updatedOrderModel = await OrderModel.findOne(
      {
        where: {
          id: order1.id,
        },
        include: ['items'],
      });

    // Assert
    expect(updatedOrderModel.toJSON()).toStrictEqual(
      {
        id: '1',
        customerId: '1',
        items: [
          {
            id: '1',
            name: 'Product 1',
            orderId: '1',
            price: 10,
            productId: '1',
            quantity: 10,
          },
          {
            id: '2',
            name: 'Product 2',
            orderId: '1',
            price: 20,
            productId: '2',
            quantity: 20,
          },
        ],
        total: 500,
      });
  });

  it('should update a order removing a existing order item', async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, '1', 'City 1');
    customer.changeAddress(address);

    const product1 = new Product('1', 'Product 1', 10);
    const product2 = new Product('2', 'Product 2', 20);

    const orderItem1 = new OrderItem(
      '1',
      product1.name,
      product1.price,
      product1.id,
      10,
    );
    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      20,
    );

    const order1 = new Order('1', '1', [orderItem1, orderItem2]);

    await customerRepository.create(customer);
    await productRepository.create(product1);
    await productRepository.create(product2);
    await orderRepository.create(order1);

    const createdOrderModel = await OrderModel.findOne(
      {
        where: {
          id: order1.id,
        },
        include: ['items'],
      });

    expect(createdOrderModel.toJSON()).toStrictEqual(
      {
        id: '1',
        customerId: '1',
        items: [
          {
            id: '1',
            name: 'Product 1',
            orderId: '1',
            price: 10,
            productId: '1',
            quantity: 10,
          },
          {
            id: '2',
            name: 'Product 2',
            orderId: '1',
            price: 20,
            productId: '2',
            quantity: 20,
          },
        ],
        total: 500,
      });

    order1.removeItem(orderItem2);

    await orderRepository.update(order1);

    const updatedOrderModel = await OrderModel.findOne(
      {
        where: {
          id: order1.id,
        },
        include: ['items'],
      });

    expect(updatedOrderModel.toJSON()).toStrictEqual(
      {
        id: '1',
        customerId: '1',
        items: [
          {
            id: '1',
            name: 'Product 1',
            orderId: '1',
            price: 10,
            productId: '1',
            quantity: 10,
          },
        ],
        total: 100,
      });
  });

  it('should find a order', async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer1 = new Customer('1', 'Customer 1');
    const address1 = new Address('Street 1', 1, '1', 'City 1');
    customer1.changeAddress(address1);

    const product1 = new Product('1', 'Product 1', 10);

    const orderItem1 = new OrderItem('1', 'Product 1', 10, '1', 10);
    const order1 = new Order('1', '1', [orderItem1]);

    // Act
    await customerRepository.create(customer1);
    await productRepository.create(product1);
    await orderRepository.create(order1);

    const foundOrder = await orderRepository.find('1');

    // Assert
    expect(foundOrder).toStrictEqual(order1);
  });

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer1 = new Customer('1', 'Customer 1');
    const address1 = new Address('Street 1', 1, '1', 'City 1');
    customer1.changeAddress(address1);

    const product1 = new Product('1', 'Product 1', 10);
    const product2 = new Product('2', 'Product 2', 20);

    const orderItem1 = new OrderItem(
      '1',
      product1.name,
      product1.price,
      product1.id,
      10,
    );

    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      20,
    );

    const order1 = new Order('1', '1', [orderItem1]);
    const order2 = new Order('2', '1', [orderItem2]);

    const orders = [order1, order2];

    await customerRepository.create(customer1);
    await productRepository.create(product1);
    await productRepository.create(product2);
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toStrictEqual(orders);
  });
});
