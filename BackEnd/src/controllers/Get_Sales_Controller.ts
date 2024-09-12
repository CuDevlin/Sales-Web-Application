import { Request, Response } from 'express';
import { DatabaseService } from '../data/service';
import { Order } from '../entity/Order';
import { OrderItem } from '../entity/OrderItem';
import { Customer } from '../entity/Customer';

const dataSource = DatabaseService.getInstance();

export const getOrdersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await dataSource.getRepository(Order).createQueryBuilder().getCount();

        if (orders !== 0) {
            res.status(200).json(orders);
        } else {
            res.status(404).json([]);
        }
    } catch (error) {
        console.error('Error retrieving order data:', error);
        res.status(500).json({ error: 'Error Retrieving Order Data' });
    }
};

export const getRevenueController = async (req: Request, res: Response): Promise<void> => {
    try {
        const revenue = await dataSource
            .getRepository(OrderItem)
            .createQueryBuilder()
            .select('SUM(price)', 'total')
            .getRawOne();

        if (revenue.total !== 0) {
            res.status(200).json(parseInt(revenue.total));
        } else {
            res.status(404).json([]);
        }
    } catch (error) {
        console.error('Error retrieving revenue data:', error);
        res.status(500).json({ error: 'Error Retrieving Revenue Data' });
    }
};

export const getCustomersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const customers = await dataSource.getRepository(Customer).createQueryBuilder().getCount();

        if (customers !== 0) {
            res.status(200).json(customers);
        } else {
            res.status(404).json([]);
        }
    } catch (error) {
        console.error('Error retrieving customer data:', error);
        res.status(500).json({ error: 'Error Retrieving Customer Data' });
    }
};
