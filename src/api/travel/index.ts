import * as express from 'express';

const travel = express.Router();

travel.use(express.json());

travel.get('/', (req: express.Request, res: express.Response) => {
    res.send('/api/travel');
});

module.exports = travel;
