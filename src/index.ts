import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import router from './routes/index';
import errorMiddleware from './middlewares/error-middleware';
import SequelizeConnection from './config/SequelizeConnection';
import { Logging } from './config/Logging';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL
    })
);
app.use('/api', router);
app.use(errorMiddleware);
Logging.configureLogger();

const start = async () => {
    try {
        await SequelizeConnection.connect();
        app.listen(PORT, () => Logging.info(process.env.NODE_ENV || 'development', `Server started on port ${PORT}`));
    } catch (e) {
        Logging.error('Unable to connect to the database:', e);
    }
};

start();
