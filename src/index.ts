import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import helmet from 'helmet';
import * as cors from 'cors';
import * as compression from 'compression';

const app = express();
const hostname = process.env.NODE_HOSTNAME;
const port = process.env.NODE_PORT;
const logger = require('./lib/logger');

app.use(helmet());
app.options('*', cors({credentials: true, origin:true}));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) =>{
    logger.info(`[EXPRESS] path: ${req.path}, req:${req.method}, ip: ${req.ip}`);
    res.end('hello world!');
});

app.listen(port, hostname, () => {
    logger.info(`[EXPRESS] Server running at http://${hostname}:${port}`)
})