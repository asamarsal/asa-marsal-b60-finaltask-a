const express = require('express')
const app = express()
const hbs = require('hbs');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('express-flash');
const session = require('express-session');
const upload = require('./middlewares/upload-file');

const { renderHome, renderRegister, renderLogin, authLogin, authLogout, authRegister, renderBlog, renderBlogDetail, renderBlogEdit, updateBlog, deleteBlog, renderBlogCreate, createBlog, renderBlogType, createType, renderdeleteType, deleteType, renderError} = require('./controllers/controller-v2');

const port = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
    name: 'my-session',
    secret: 'secret123',
    resave: false,
    saveUninitialized: true,
}));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b,){
    return a == b;
});

app.get('/', renderHome);

app.get('/login', (req, res) => {
    res.render("auth-login")
})

app.get('/register', renderRegister)

app.get('/login', renderLogin)

app.get('/logout', authLogout)

app.post('/login', authLogin);

app.post('/register', authRegister);

app.get('/auth-login', (req, res) => {
    res.render("auth-login")
})

app.get('/auth-register', (req, res) => {
    res.render("auth-register")
})

//Render Create Blog
app.get('/blog-create', renderBlogCreate)

//Submit New Blog
app.post('/blog-create', upload.single('image'), createBlog);

app.use('/uploads', express.static('uploads'));

//Render Edit Blog
app.get('/blog-edit/:id', renderBlogEdit);

//Submit Edited Blog
app.patch("/blog-update/:id", updateBlog);

//Delete Existing Blog
app.delete("/blog/:id", deleteBlog);

app.get('/blog-detail', (req, res) => {
    res.render("blog-detail")
})

//Blog Detail
app.get('/blog/:id', renderBlogDetail)

//Blog List
app.get('/blog', renderBlog);

app.post('/blog-type', createType);
app.get('/blog-type', renderBlogType);

app.get('/delete-type', renderdeleteType);

app.delete('/delete-type/:id', deleteType);

//Error Page
app.get('*', renderError);

app.listen(port, () => {
  console.log(`Web listening on port ${port}`)
})