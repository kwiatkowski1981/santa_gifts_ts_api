import * as express from "express";
import './utils/db';
import {engine} from "express-handlebars";
import * as methodOverride from "method-override";
import {handleError} from "./utils/errors";
import {handlebarsHelpers} from "./utils/handlebars-helpers";
import {homeRouter} from "./routers/home";
import {childRouter} from "./routers/child";
import {giftRouter} from "./routers/gift";
import 'express-async-errors';


const app = express();
const HOST = 'localhost';
const PORT = 3000;

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());

app.engine('hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/child', childRouter);
app.use('/gift', giftRouter);

app.use(handleError);

app.listen(PORT, HOST, () => {
    console.log('Listening on http://localhost:3000');
});