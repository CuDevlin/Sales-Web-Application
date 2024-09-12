import { Request, Response } from 'express';
import { Order } from '../entity/Order';
import { OrderItem } from '../entity/OrderItem';
import { DatabaseService } from '../data/service';
import { addMonths, subDays, startOfMonth, endOfMonth } from 'date-fns';

const connection = DatabaseService.getInstance();

async function getStatisticsController(req: Request, res: Response) {
  try {
    const { fromDate } = req.params;

    const fromDateObj = new Date(fromDate + '-01');
    const toDateObj = new Date(addMonths(fromDateObj, 1));
    const finalToDateObj = subDays(toDateObj, 1);

    const query = `
        SELECT TO_CHAR(o."purchaseDate", 'YYYY-MM-DD') AS purchaseDate
             , oi.price
        FROM web_app_schema.order o
                 INNER JOIN web_app_schema.order_item oi ON oi."orderId" = o.id
        WHERE o."purchaseDate" BETWEEN $1 AND $2
        ORDER BY purchaseDate
    `;

    const result = await connection.query(query, [fromDateObj, finalToDateObj]);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error('Error retrieving joined data:', error);
    res.status(500).json({ error: 'Error Getting Joined Table Data' });
  }
}

async function getTotalRevenueController(req: Request, res: Response) {
  try {
    const { fromDate } = req.params;

    const fromDateObj = new Date(fromDate + '-01');
    const startDate = startOfMonth(fromDateObj);
    const endDate = endOfMonth(fromDateObj);

    const result = await connection
      .getRepository(Order)
      .createQueryBuilder('o')
      .innerJoin(OrderItem, 'oi', 'oi."orderId" = o.id')
      .select('SUM(oi.price) AS totalRevenue')
      .where('o."purchaseDate" BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getRawOne();

    if (result && result.totalRevenue !== null) {
      res.status(200).json(result);
    } else {
      res.status(200).json({ totalRevenue: 0 });
    }
  } catch (error) {
    console.error('Error retrieving total revenue:', error);
    res.status(500).json({ error: 'Error Getting Monthly Revenue' });
  }
}

export { getStatisticsController, getTotalRevenueController };
