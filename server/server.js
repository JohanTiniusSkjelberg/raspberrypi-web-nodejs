if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express")
const app = express()
app.use(express.static('public'))
const bcrypt = require("bcrypt")
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('./passport-config')
const axios = require('axios')
const api = require('./src/routes/rapidapi.js')

initializePassport(
    passport, 
    email => {return users.find(user => user.email === email)},
    id => {return users.find(user => user.id === id)}
    )

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: false })); //makes form data readable
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

const users = []

// remove checkautenticated if you want to access root

// app.get('/loggedinpage',checkAuthenticated,(req,res) => {
//     res.render('loggedin.ejs')
// })

app.get('/', (req, res) => {
    api.searchRecipe()
    res.render('index.ejs')
})
app.get('/users',(req, res) => {
    res.json(users)
})
app.get('/login', checkNotAuthenticated,(req, res) => {
    res.render('login.ejs')
})
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})
app.post('/login', checkNotAuthenticated,passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hasedpassword = await bcrypt.hash(req.body.password, 10)
        const user = { 
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hasedpassword,
        }
        users.push(user)
        console.log(users);
        res.status(201)
        res.redirect('/login')
    }
    catch {
        res.status(500).send("body not found")
        console.log("WRONG");
    }
})


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

// api.getMeals()

app.listen(3000)