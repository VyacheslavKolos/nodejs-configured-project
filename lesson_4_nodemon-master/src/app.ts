import 'reflect-metadata';

import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(
    '/users',
    async (req: Request, res: Response) => {
        const users = await getManager().getRepository(User).find({ relations: ['posts'] });
        res.json(users);

        // const user = await getManager().getRepository(User).findOne({
        //     where: {
        //         firstName: 'Kokos',
        //     },
        // });
        // res.json(user);

        //   SQL запит
        // const users = await getManager().getRepository(User)
        //     .createQueryBuilder('user')
        //     .where('user.firstName = "Kokos"')
        //     .getOne();
        // res.json(users);

        // Інший запит: тільки ті юзерси, які в своїх постах мають такі значення: "..."
        // const users = await getManager().getRepository(User)
        //     .createQueryBuilder('user')
        //     .leftJoin('Posts', 'posts', 'posts.userId = user.id')
        //     .where('posts.text = "Possssst"')
        //     .getMany();
        // res.json(users);
    },
);

app.post('/users', async (req, res) => {
    const createdUser = await getManager().getRepository(User).save(req.body);
    res.json(createdUser);
});

app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const updatedUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(updatedUser);
});

// app.delete('/users/:id', async (req, res) => {
//     const deletedUser = await getManager()
//         .getRepository(User)
//         .delete({ id: Number(req.params.id) });
//     res.json(deletedUser);
// });

app.delete('/users/:id', async (req, res) => {
    const deletedUser = await getManager()
        .getRepository(User)
        .softDelete({ id: Number(req.params.id) });
    res.json(deletedUser);
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
