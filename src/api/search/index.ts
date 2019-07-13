import * as express from 'express';
import * as multer from 'multer';
const searchCtrl = require('./search.ctrl');

const search = express.Router();

search.use(express.json());

search.get('/title', searchCtrl.title);
search.get('/place', searchCtrl.place);

module.exports = search;
