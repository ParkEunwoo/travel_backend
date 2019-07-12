"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.use('/travel', require('./travel'));
router.use('/user', require('./user'));
router.use(express.json());
router.get('/', (req, res) => {
    res.send('/api');
});
module.exports = router;
//# sourceMappingURL=index.js.map