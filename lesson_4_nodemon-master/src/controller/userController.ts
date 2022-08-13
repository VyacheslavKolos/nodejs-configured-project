import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { IUser, User } from '../entity/user';

class UserController {
    public async createUser(req:Request, res:Response):Promise<Response<IUser>> {
        const createdUser = await getManager().getRepository(User).save(req.body);
        return res.json(createdUser);
    }

    public async getUsers(req:Request, res:Response):Promise<Response<IUser[]>> {
        const users = await getManager().getRepository(User).find({ relations: ['posts'] });
        return res.json(users);

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
    }
}

export const userController = new UserController();
