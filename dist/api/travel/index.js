"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const travel = express.Router();
travel.use(express.json());
travel.get('/', (req, res) => {
    res.send('/api/travel');
});
module.exports = travel;
//# sourceMappingURL=index.js.map