import express from 'express';
import { getJoinedTableController } from '../controllers/Get_Joined_Controller';

const router = express.Router();

router.get('/joined', getJoinedTableController);

export { router as getJoinedTable };