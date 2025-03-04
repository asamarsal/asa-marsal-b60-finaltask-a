const express = require('express')
const app = express()
const hbs = require('hbs');
const path = require('path');
const methodOverride = require('method-override');

const {renderBlog, renderBlogDetail, createBlog, deleteBlog, updateBlog, renderBlogEdit} = require('./controllers/controller-v1');

const port = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride('_method'));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b,){
    return a == b;
});

app.get('/', (req, res) => {
    //res.send('Hello Asa Marsal Keren Banget!')
    res.render("index")
})

app.get('/auth-login', (req, res) => {
    res.render("auth-login")
})

app.get('/auth-register', (req, res) => {
    res.render("auth-register")
})

//Render Create Blog
app.get('/blog-create', (req, res) => {
    res.render("blog-create")
})

//Submit New Blog
app.post('/blog-create', createBlog);

//Render Edit Blog
app.get('/blog-edit/:id', renderBlogEdit);

//Submit Edited Blog
app.patch("/blog-update/:id", updateBlog);

//Delete Existing Blog
app.delete("/blog/:id", deleteBlog);

app.get('/blog-type', (req, res) => {
    res.render("blog-type")
})

app.get('/blog-detail', (req, res) => {
    res.render("blog-detail")
})

//Blog Detail
app.get('/blog/:id', renderBlogDetail)

//Blog List
app.get('/blog', renderBlog);

app.listen(port, () => {
  console.log(`Web listening on port ${port}`)
})