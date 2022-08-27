import { Request, Response } from 'express';
import { userService } from './userService';
import { IUser } from '../entity/user';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(req:Request, res:Response) {
        const { email } = req.body;
        const userFromDb = await userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email: ${email} already exists`);
        }
        const createdUser = userService.createUser(req.body);
    }

    private async _getTokenData(userData : IUser) {
        const { id, email } = userData;
        const tokensPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
    }
}

export const authService = new AuthService();
