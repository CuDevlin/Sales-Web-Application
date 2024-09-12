import { DatabaseService } from './data/service';
import express, { json } from 'express';
import cors from 'cors';
import { mainRouter } from './routes/indexRouter';

const appExpress = express();
const connection = DatabaseService.getInstance();

const main = async () => {
    await connection
        .initialize()
        .then(() => {
            console.log('Data Source initialized!');

            // Enable CORS for all routes
            appExpress.use(cors());

            appExpress.use(json());
            appExpress.use(mainRouter);

            appExpress.listen(8080, () => {
                console.log('Express app running on port:8080');
            });
        })
        .catch((err) => {
            console.error('Error during Data Source initialization', err);
        });
};

main().then(() => { });
