import { IUser } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    public async createUser(user:IUser):Promise<IUser> {
        const createdUser = userRepository.createUser(user);
        return createdUser;
    }

    public async getUsers():Promise<IUser[]> {
        const users = userRepository.getUsers();
        return users;
    }

    public async getUserByEmail(email:string):Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }
}

export const userService = new UserService();
