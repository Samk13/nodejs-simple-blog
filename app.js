const express = require('express')
const morgan = require('morgan')


// express app
const app = express()

// register view engine
app.set('view engine', 'ejs')

// listning for requests
const port = 3000
app.listen(port)

// adding middelware
// loging information about req
app.use(morgan('dev'))

const blogs = [
    {title: 'Sam', snippet : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit'},
    {title: 'Sam', snippet : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit'},
    {title: 'Sam', snippet : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit'},
    {title: 'Sam', snippet : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit'}
]

app.get('/', (req, res) => {
    res.render('index',{ title: 'Home', blogs})
})

app.get('/about',(req, res) => {
    res.render('about',{title: 'about'})
})

app.get('/blogs/create',(req, res) => {
    res.render('create', {title: 'create blog'})
})

// redirect 
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})