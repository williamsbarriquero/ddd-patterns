import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order-item';
import IOrderRepositoryInterface from '../../../../domain/checkout/repository/order.repository.interface';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';

export default class OrderRepository implements IOrderRepositoryInterface {
  public async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      },
    );
  }

  public async update(entity: Order): Promise<void> {
    const order = await OrderModel.findOne(
      {
        where: {
          id: entity.id,
        },
        include: ['items'],
      });

    for (const orderItem of order.items) {
      if (entity.items.find(x => x.id === orderItem.id) === undefined) {

        await OrderItemModel.destroy(
          {
            // @ts-ignore
            where: {
              id: orderItem.id,
            },
          });
      }
    }

    for (const orderItem of entity.items) {
      const orderItemModel = await OrderItemModel.findOne(
        {
          // @ts-ignore
          where: {
            id: orderItem.id,
          },
        });

      if (orderItemModel == null) {
        await OrderItemModel.create(
          {
            id: orderItem.id,
            name: orderItem.name,
            // @ts-ignore
            orderId: entity.id,
            price: orderItem.price,
            productId: orderItem.productId,
            quantity: orderItem.quantity,
          });
      } else {
        // @ts-ignore
        await orderItemModel.update(
          {
            name: orderItem.name,
            price: orderItem.price,
            productId: orderItem.productId,
            quantity: orderItem.quantity,
          });
      }
    }

    // @ts-ignore
    await order.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      });
  }

  public async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne(
      {
        where: {
          id,
        },
        include: ['items'],
      });

    return new Order(
      orderModel.id,
      orderModel.customerId,
      orderModel.items.map(
        orderItemModel =>
          new OrderItem(
            orderItemModel.id,
            orderItemModel.name,
            orderItemModel.price,
            orderItemModel.productId,
            orderItemModel.quantity,
          ),
      ),
    );
  }

  public async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll(
      {
        include: ['items'],
      });

    return orderModels.map(
      orderModel =>
        new Order(
          orderModel.id,
          orderModel.customerId,
          orderModel.items.map(
            orderModelItem =>
              new OrderItem(
                orderModelItem.id,
                orderModelItem.name,
                orderModelItem.price,
                orderModelItem.productId,
                orderModelItem.quantity,
              ),
          ),
        ),
    );
  }
}
