import 'reflect-metadata';

import express from 'express';
import { createConnection } from 'typeorm';

import { apiRouter } from './router/apiRouter';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(apiRouter);

app.listen(5500, async () => {
    console.log('Server started on port 5500!!!');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database Connected');
        }
    } catch (err) {
        console.log(err);
    }
});
