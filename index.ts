import * as express from "express";
import 'express-async-errors';
import * as cors from 'cors';
import './utils/db';
import {handleError} from "./utils/errors";
import {childRouter} from "./routers/child";
import {giftRouter} from "./routers/gift";

const app = express();
const HOST = 'localhost';
const PORT_BE = 3001;
const PORT_FE = 3000;

app.use(express.json());
app.use(cors({origin: `http://${HOST}:3000`}));
app.use('/child', childRouter);
app.use('/gift', giftRouter);
app.use(handleError);

app.listen(PORT_BE, HOST, () => {console.log('Listening on http://localhost:3001')});