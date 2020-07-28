const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./routes/blogRoutes')



// express app
const app = express()
const port = 3000

// connect to mango db
const dbURI = 'mongodb+srv://samk13:samk131313@cluster0-fwftc.gcp.mongodb.net/nodejs-simple-blog?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=>{
        console.group()
        console.warn('\x1b[34m','============================')
        console.log('\x1b[33m%s\x1b[0m',' ==> connected to MongoDB <==')
        console.warn('\x1b[34m','============================')
        console.groupEnd()
        app.listen(port)
    })
    .catch(e => console.log(e))

// register view engine
app.set('view engine', 'ejs')

// adding middelware
app.use(express.static('public'))
// this middelware urlencoded is responsible about parsing the POST req without this the post req will not work
app.use(express.urlencoded({ extended: true }))
// loging information about req
app.use(morgan('dev'))
// rigestering the router
router.get('/', (req, res) => {
    res.redirect('/blogs')
})
app.use('/blogs', router)

//about 
app.get('/about',(req, res) => {
    res.render('about',{title: 'about'})
})

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
  });
  
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });
// blog routes
app.use('/blogs', router);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})