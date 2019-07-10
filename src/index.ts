require('dotenv').config();
import * as express from 'express';
import * as mongoose from 'mongoose';

const app = express();

const {
    PORT: port = 3000,
    MONGO_URI: mongoURI
} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).then(() => {
    console.log(mongoURI);
    console.log('connnected to mongodb');
}).catch((e: any) => {
    console.error(e);
});

app.use(express.json());
app.use(express.static('public'));
app.use('/api', require('./api'));

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('hello world!');
});

app.listen(port, () => {
    console.log('listening on port ' + port);
});