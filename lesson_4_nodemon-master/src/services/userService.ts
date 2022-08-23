import { UpdateResult } from 'typeorm';
import { IUser } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    public async createUser(user:IUser):Promise<IUser> {
        const createdUser = userRepository.createUser(user);
        return createdUser;
    }

    public async getUserByEmail(id:string):Promise<IUser | undefined > {
        return userRepository.getUserByEmail(id);
    }

    public async getUsers():Promise<IUser[]> {
        const users = userRepository.getUsers();
        return users;
    }

    public async deleteUser(id:number):Promise<void> {
        await userRepository.deleteUser(id);
    }

    public async updateUser(email:string, password:string, id:number):Promise<UpdateResult> {
        const updatedUser = userRepository.updateUser(email, password, id);
        return updatedUser;
    }
}

export const userService = new UserService();
