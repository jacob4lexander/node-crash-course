const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes')

const dbURI = 'mongodb+srv://jacobclayton:1vUbmu4L3EdOnslP@cluster0.mv0gb66.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=> console.log('connected to db'), app.listen(3000))
.catch ((err)=> console.log(err))

//register view engine 
app.set('view engine', 'ejs');



app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/add-blog', (req, res )=> {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'hahahaha my blog',
        body : 'oh this is a great blog ahahaha funny blog'
    })
blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
})

app.get('/about', (req, res)=> {

    res.render('about', {title: 'About'});

});

app.get('/all-blogs', (req, res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);

    })
    .catch((err)=>{
        console.log(err);
    });
})

app.get('/single-blog', (req, res) =>{
    Blog.findById('664f3c62c96e3795f056c207')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })
} )

app.use((req, res, next)=> {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();

});

app.use((req, res, next)=> {
    console.log('in the next middlewear');

    next();

});

app.get('/', (req, res)=> {
    

    res.redirect('/blogs');

});

app.use(blogRoutes);

app.use((req, res)=> {
    res.status(404).render('404', {title: '404'})
});

