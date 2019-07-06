"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const travel_ctrl_1 = require("./travel.ctrl");
const travel = express.Router();
travel.use(express.json());
/*
travel.get('/', (req: express.Request, res: express.Response) => {
    res.send('/api/travel');
});
*/
travel.get('/', travel_ctrl_1.default.mylist);
module.exports = travel;
//# sourceMappingURL=index.js.map