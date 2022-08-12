import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { IUser, User } from '../entity/user';

class UserController {
    public async getUsers(req:Request, res:Response) :Promise<Response<IUser[]>> {
        // const users = await getManager().getRepository(User).find({ relations: ['posts'] });
        // res.json(users);

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
        const users = await getManager().getRepository(User)
            .createQueryBuilder('user')
            .leftJoin('Posts', 'posts', 'posts.userId = user.id')
            .where('posts.text = "Possssst"')
            .getMany();
        return res.json(users);
    }

    public async createUser(req:Request, res:Response) :Promise<Response<IUser>> {
        const createdUser = await getManager().getRepository(User).save(req.body);
        return res.json(createdUser);
    }

    public async updateUser(req:Request, res:Response) :Promise<Response<IUser>> {
        const { password, email } = req.body;
        const { id } = req.params;
        const updatedUser = await getManager()
            .getRepository(User)
            .update({ id: Number(id) }, {
                password,
                email,
            });
        return res.json(updatedUser);
    }

    public async deleteUser(req:Request, res:Response) :Promise<Response<IUser>> {
        const { id } = req.params;
        const deletedUser = await getManager()
            .getRepository(User)
            .softDelete({ id: Number(id) });
        return res.json(deletedUser);
    }
}

export const userController = new UserController();
