import { Router } from 'express';
import { userRouter } from './userRouter';
import { postRouter } from './postRouter';

const router = Router();

router.use('/users', userRouter);

router.use('/posts', postRouter);

export const apiRouter = router;
