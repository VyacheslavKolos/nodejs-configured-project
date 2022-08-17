import { Request, Response } from 'express';

import { IUser } from '../entity/user';
import { userService } from '../services/userService';

class UserController {
    public async createUser(req:Request, res:Response):Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUsers(req:Request, res:Response):Promise<Response<IUser[]>> {
        const users = await userService.getUsers();
        return res.json(users);
    }

    public async getUserByEmail(req:Request, res:Response):Promise<Response<IUser>> {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }
}

export const userController = new UserController();
