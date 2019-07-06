import * as express from 'express';

const router = express.Router();

router.use('/travel', require('./travel'));
router.use(express.json());

router.get('/', (req: express.Request, res: express.Response) => {
    res.send('/api');
});

module.exports = router;
