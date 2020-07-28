const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const { render } = require('ejs')
const { add } = require('lodash')

// express app
const app = express()
const port = 3000

// connect to mango db
const dbURI = 'mongodb+srv://samk13:samk131313@cluster0-fwftc.gcp.mongodb.net/nodejs-simple-blog?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=>{
        console.log('connected to Mongo DB')
        app.listen(port)
    })
    .catch(e => console.log(e))

// register view engine
app.set('view engine', 'ejs')

// adding middelware
app.use(express.static('public'))
// the middelware urlencoded is responsible about parsing the POST req without this the post req will not work
app.use(express.urlencoded({ extended: true }))

// loging information about req
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
    // res.render('index',{ title: 'Home', blogs})
    res.redirect('/blogs')
})

app.get('/about',(req, res) => {
    res.render('about',{title: 'about'})
})

app.get('/blogs/create',(req, res) => {
    res.render('create', {title: 'create blog'})
})

app.get('/blogs',(req, res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index.ejs',{title: 'All Blogs', blogs:result})
    })
    .catch((e)=> console.log(e))
})

// post handeler

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then(result => res.redirect('/blogs'))
        .catch(e => console.error(e))
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            res.render('details', {blog: result, title: 'Blog detail'})
        })
        .catch(e => console.error(e))
})
// TODO make delete works 
app.delete('/blogs/:id', (req, res) =>{
    const id = req.params.id
    Blog.findById(id)
    .then(()=>{
        res.json({redirect: '/blogs'})
    })
    .catch(e => console.log(e))
})
// redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})