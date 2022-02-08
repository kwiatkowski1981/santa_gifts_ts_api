import * as express from "express";
require('express-async-errors');
const {engine} = require('express-handlebars');
const methodOverride = require('method-override');
const {handleError} = require("./utils/errors");
const {handlebarsHelpers} = require("./utils/handlebars-helpers");
const {homeRouter} = require("./routers/home");
const {childRouter} = require("./routers/child");
const {giftRouter} = require("./routers/gift");
require('./utils/db');


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