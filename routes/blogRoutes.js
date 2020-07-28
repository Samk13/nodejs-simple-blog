const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()

// routes

router.get('/',(req, res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index.ejs',{title: 'All Blogs', blogs:result})
    })
    .catch((e)=> console.log(e))
}) 


router.get('/create',(req, res) => {
    res.render('create', {title: 'create blog'})
})



// post handeler
router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then(result => res.redirect('/blogs'))
        .catch(e => console.error(e))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            res.render('details', {blog: result, title: 'Blog detail'})
        })
        .catch(e => console.error(e))
})

router.delete('/blogs/:id', (req, res) =>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then(()=>{
        res.json({redirect: '/blogs'})
    })
    .catch(e  => console.log(e))
})

module.exports = router