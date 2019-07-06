"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const travelCtrl = require('./travel.ctrl');
const travel = express.Router();
travel.use(express.json());
travel.get('/', travelCtrl.myList);
travel.post('/', travelCtrl.addTravel);
travel.post('/:id/daily/:day', travelCtrl.writeDaily);
module.exports = travel;
//# sourceMappingURL=index.js.map