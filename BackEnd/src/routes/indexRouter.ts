import express from 'express';
import {
  getOrdersController,
  getRevenueController,
  getCustomersController,
} from '../controllers/Get_Sales_Controller';
import { getJoinedTableController } from '../controllers/Get_Joined_Controller';
import { getStatisticsController, getTotalRevenueController } from '../controllers/Get_Statistics_Controller';
import { getTimeframeController } from '../controllers/Get_Timeframe_Controller';


const router = express.Router();

router.get('/total/orders', getOrdersController);
router.get('/total/revenue', getRevenueController);
router.get('/total/customers', getCustomersController);
router.get('/joined', getJoinedTableController);
router.get('/statistics/:fromDate', getStatisticsController);
router.get('/total/revenue/:fromDate', getTotalRevenueController);
router.get('/timeframe', getTimeframeController);

export { router as mainRouter };