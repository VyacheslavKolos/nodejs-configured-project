import { Router } from 'express';

import { userRouter } from './usersRouter';

const router = Router();

router.use('/users', userRouter);

router.use((req, res) => {
    res.render('notFound');
});

export const apiRouter = router;
