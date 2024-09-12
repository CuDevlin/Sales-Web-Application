import { Request, Response } from 'express';
import { Order } from '../entity/Order';
import { Customer } from '../entity/Customer';
import { OrderItem } from '../entity/OrderItem';
import { DatabaseService } from '../data/service';

const dataSource = DatabaseService.getInstance();

async function getJoinedTableController(req: Request, res: Response) {
  try {
    const result = await dataSource
      .getRepository(Order)
      .createQueryBuilder('o')
      .select([
        'o.id AS order_id',
        'o.device',
        "TO_CHAR(o.purchaseDate, 'YYYY-MM-DD') AS purchaseDate",
        'c.id AS customer_id',
        'c.firstName',
        'c.lastName',
        'oi.id AS order_item_id',
        'oi.quantity',
        'oi.price',
      ])
      .innerJoin(Customer, 'c', 'o.customerId = c.id')
      .innerJoin(OrderItem, 'oi', 'o.id = oi.orderId')
      .getRawMany();

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    console.error('Error retrieving joined data:', error);
    res.status(500).json({ error: 'Error Getting Joined Tables' });
  }
}

export { getJoinedTableController };
