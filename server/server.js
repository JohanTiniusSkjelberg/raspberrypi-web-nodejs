const PORT = process.env.PORT ?? 8000

// if you are not developing use the secret key from file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();

}

// importing all the packages for express, login and hashing
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
const pool = require('./db')
const cors = require('cors')
// function says it
initializePassport(
    passport, 
    email => {return users.find(user => user.email === email)},
    id => {return users.find(user => user.id === id)}
    )

app.use(cors())
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
app.set('views', './src/views');

// all routes 
app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.get('/db/:userEmail', async (req, res) => {
    const { userEmail } = req.params
    try {
        const datebs = await pool.query('SELECT * FROM meals WHERE user_email = $1', [userEmail])
        res.json(datebs.rows)
    }catch(erro){
        console.log(erro);
    }
});
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


app.get('/check-data', async (req, res) => {
    let { ids }= req.query;
    let inputArr = ids.split(',');
    const queryText = `
      SELECT id
      FROM meals
      WHERE id NOT IN ($1)
    `;

    try {
        const result = await pool.query(queryText, [inputArr]);
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error checking data' });
    }
});

// Denies access to routes if not qualified
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


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));