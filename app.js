const express = require('express')
const app = express();

const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')

require('./config/passport')(passport)

// DB Config
// const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/PassportJS', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected!');
    })
    .catch((err) => {
        console.log(err);
    })



//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs');

//BodyParser
app.use(express.urlencoded({ extended: false }));


//Express session
app.use(session({
    secret: 'turky',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true },
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect FLash\
app.use(flash());

//Global var
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next();
})

//ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



//Server
const port = 9898 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on ${port}`);
})