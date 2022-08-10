import 'reflect-metadata';

import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    '/users',
    async (req: Request, res: Response) => {
        const users = await getManager().getRepository(User).find();
        res.json(users);
    },
);

app.post('/users', async (req: Request, res: Response) => {
    console.log(req.body);
    // const createdUser = await getManager().getRepository(User).save(req.body);
    // res.json(createdUser);
});

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
