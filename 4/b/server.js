const express = require('express')
const path = require('path');
const app = express()
const hbs = require('hbs');
const port = 3000

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b,){
    return a == b;
});

let blogs = [
    
];

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

//Create Blog
app.get('/blog-create', (req, res) => {
    res.render("blog-create")
})

//Submit Create Blog
app.post('/blog-create', (req, res) => {
    const { title, pokemontype, pokemontrainer, newPokemonType, newPokemonTrainer } = req.body;
    console.log({
        title,
        pokemontype,
        newPokemonType,
        pokemontrainer,
        newPokemonTrainer
    });

    let newBlog = {
        title: title,
        pokemontype: pokemontype || newPokemonType,
        pokemontrainer: pokemontrainer || newPokemonTrainer
    };

    blogs.push(newBlog);

    res.redirect("blog");
});

app.get('/blog-type', (req, res) => {
    res.render("blog-type")
})

app.get('/blog-detail', (req, res) => {
    res.render("blog-detail")
})

app.get('/blog-edit', (req, res) => {
    res.render("blog-edit")
})

app.get('/blog', (req, res) => {
    res.render("blog-list",  { blogs: blogs })
})

app.listen(port, () => {
  console.log(`Web listening on port ${port}`)
})