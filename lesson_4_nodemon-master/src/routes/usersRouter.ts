import Router from 'express';

import { userController } from '../controllers/userController';

const usersRouter = Router();

usersRouter.get('/', userController.getUsers);

usersRouter.post('/', userController.createUser);

// usersRouter.patch('/:id', userController.updateUser);

usersRouter.delete('/', userController.deleteUser);

export const userRouter = usersRouter;
