"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.use(express.json());
app.use('/api', require('./api'));
app.get('/', (req, res) => {
    res.send('hello world!');
});
app.listen(3000, () => {
    console.log('listening on port 3000');
});
//# sourceMappingURL=index.js.map