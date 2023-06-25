import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import router from './routes/index';
import errorMiddleware from './middlewares/error-middleware';
import SequelizeConnection from './config/SequelizeConnection';

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

const start = async () => {
    try {
        await SequelizeConnection.connect();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
};

start();
