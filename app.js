const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');
const adminRouter = require('./router/adminRouter');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');


app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

const sessionConfig = {
    secret: 'svnsdngj',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        path: '/',
        maxAge: 1000 * 60 * 60 * 24
    }
};

app.use(expressSession(sessionConfig));
app.use(cookieParser());

app.use('/admin', adminRouter);


app.use('/', userRouter);


const port = 3001;
app.listen(port, function () {
    console.log(`server started at PORT::: ${port}`);
});