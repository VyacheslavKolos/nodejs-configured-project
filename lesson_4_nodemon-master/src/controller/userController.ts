import { Request, response, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../entity/user';
import { userService } from '../services/userService';
import {UpdateResult} from "typeorm";

class UserController {
    public async createUser(req:Request, res:Response):Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUsers(req:Request, res:Response):Promise<Response<IUser[]>> {
        const users = await userService.getUsers();
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

    public async deleteUser(req:Request, res:Response):Promise<any> {
        try {
            const { id } = req.params;
            await userService.deleteUser(+id);
            return res.send(response.status(StatusCodes.NO_CONTENT));
        } catch (err) {
            return res.send(response.status(StatusCodes.BAD_REQUEST));
        }
    }

    public async updateUser(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { password, email } = req.body;
        const { id } = req.params;
        const updatedUser = await userService.updateUser(email, password, +id);
        return res.json(updatedUser);
    }
}

export const userController = new UserController();
