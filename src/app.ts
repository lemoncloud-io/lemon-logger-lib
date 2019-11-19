import 'source-map-support/register';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import controllers from './controllers';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

// Express App
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(controllers);

// Development Server
if (process.env.NODE_ENV === 'development') {
    const PORT = process.env.PORT || 8080;
    const HOST = process.env.HOST || 'http://127.0.0.1';
    app.listen(PORT, () => {
        console.log(`[${process.env.NODE_ENV.toUpperCase()} ENV]`);
        console.log(`Running on port ${HOST}:${PORT}`);
    });
}

export default app;
