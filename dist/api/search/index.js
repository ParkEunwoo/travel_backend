"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const searchCtrl = require('./search.ctrl');
const search = express.Router();
search.use(express.json());
search.get('/title', searchCtrl.title);
search.get('/place', searchCtrl.place);
module.exports = search;
//# sourceMappingURL=index.js.map