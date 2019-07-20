"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { PORT: port = 3000, MONGO_URI: mongoURI } = process.env;
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).then(() => {
    console.log(mongoURI);
    console.log('connnected to mongodb');
}).catch((e) => {
    console.error(e);
});
app.use(express.json());
app.use(express.static('public'));
app.use('/api', require('./api'));
app.get('/', (req, res) => {
    console.log("hdhfsalkhfkldsah");
    res.status(200).json({ success: "success" });
});
app.listen(port, () => {
    console.log('listening on port ' + port);
});
//# sourceMappingURL=index.js.map