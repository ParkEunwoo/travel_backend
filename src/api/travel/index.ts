import * as express from 'express';
import travelCtrl from './travel.ctrl';

const travel = express.Router();

travel.use(express.json());
/*
travel.get('/', (req: express.Request, res: express.Response) => {
    res.send('/api/travel');
});
*/
travel.get('/', travelCtrl.mylist);

module.exports = travel;
