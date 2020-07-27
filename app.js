const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog') 
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

// loging information about req
app.use(morgan('dev'))

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new Blog 2',
//         snippet : 'about this blog',
//         body: 'a  body for the blog '
//     })
//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch(err => console.log(err))
// })

// app.get('/all-blogs', (req, res)=> {
//     Blog.find()
//     .then((result) => res.send(result))
//     .catch(e => console.log(e))
// })

// app.get('/single-blog', (req, res)=> {
//     Blog.findById('5f16542c2ceb2d0870f70de7')
//     .then((result)=> res.send(result))
//     .catch( e => console.log(e))
// })
const string = 'sjds' + 'lasdjf' +  blogs

const blogs = [
    {title: 'Sam', snippet : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit'},
    {title: 'Sam', snippet : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit'},
    {title: 'Sam', snippet : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit'},
    {title: 'Sam', snippet : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit'}
]

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

// redirect 
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})