import { IUser } from '../../entity/user';

export interface IUserRepository{
    createUser(user:IUser):Promise<IUser>;
    getUsers(): Promise<IUser[]>;
    deleteUser(id:number):Promise<void>;
    getUserByEmail(email:string):Promise<IUser | undefined>
}
