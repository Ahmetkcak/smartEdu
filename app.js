const express = require('express');
const mongoose = require('mongoose');
var session = require('express-session');
const MongoStore = require('connect-mongo');
var flash = require('connect-flash');
const methodOverride = require('method-override')

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');



const app = express();


//Connect DB
mongoose.connect('mongodb+srv://test:test1234@smartedu-db.gmgwozs.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('DB Connected Successfuly'));

//Template engine
app.set("view engine","ejs");


global.userIN = null;

//Middlewares
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(session({
  secret: 'my keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/samrtedu-db' })
}))
app.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
})
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))


//Routes    
app.use('*',(req,res,next)=>{
  userIN = req.session.userID;
  next();
})
app.use('/',pageRoute);
app.use('/course',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);


const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});