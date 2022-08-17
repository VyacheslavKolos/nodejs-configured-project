import { IUser } from '../../entity/user';

export interface IUserRepository{
    createUser(user:IUser):Promise<IUser>;
    getUsers(): Promise<IUser[]>;
    getUserByEmail(email:string):Promise<IUser | undefined>;
}
