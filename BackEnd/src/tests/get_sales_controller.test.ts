import request from 'supertest';
import express, { Express } from 'express';
import {
  getOrdersController,
  getRevenueController,
  getCustomersController,
} from '../controllers/Get_Sales_Controller';

const app: Express = express();

app.get('/total/orders', getOrdersController);
app.get('/total/revenue', getRevenueController);
app.get('/total/customers', getCustomersController);

describe('GET /total/orders', () => {
  it('should return total orders', async () => {
    jest.mock('../data/service', () => ({
      ...jest.requireActual('../data/service'),
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue({
          getCount: jest.fn().mockResolvedValue(42),
        }),
      }),
    }));

    const response = await request(app).get('/total/orders');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(42);
  });
});

describe('GET /total/revenue', () => {
  it('should return total revenue', async () => {
    jest.mock('../data/service', () => ({
      ...jest.requireActual('../data/service'),
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnThis(),
          getRawOne: jest.fn().mockResolvedValue({ total: 100 }),
        }),
      }),
    }));

    const response = await request(app).get('/total/revenue');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(100);
  });
});

describe('GET /total/customers', () => {
  it('should return total customers', async () => {
    jest.mock('../data/service', () => ({
      ...jest.requireActual('../data/service'),
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue({
          getCount: jest.fn().mockResolvedValue(20),
        }),
      }),
    }));

    const response = await request(app).get('/total/customers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(20);
  });
});

describe('GET /total/orders', () => {
  it('should handle errors when retrieving total orders', async () => {
    jest.mock('../data/service', () => ({
      ...jest.requireActual('../data/service'),
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue({
          getCount: jest.fn().mockRejectedValue(new Error('Database error')),
        }),
      }),
    }));

    const response = await request(app).get('/total/orders');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error Retrieving Order Data' });
  });
});

describe('GET /total/revenue', () => {
  it('should handle errors when retrieving total revenue', async () => {
    jest.mock('../data/service', () => ({
      ...jest.requireActual('../data/service'),
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnThis(),
          getRawOne: jest.fn().mockRejectedValue(new Error('Database error')),
        }),
      }),
    }));

    const response = await request(app).get('/total/revenue');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error Retrieving Revenue Data' });
  });
});

describe('GET /total/customers', () => {
  it('should handle errors when retrieving total customers', async () => {
    jest.mock('../data/service', () => ({
      ...jest.requireActual('../data/service'),
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue({
          getCount: jest.fn().mockRejectedValue(new Error('Database error')),
        }),
      }),
    }));

    const response = await request(app).get('/total/customers');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error Retrieving Customer Data' });
  });
});