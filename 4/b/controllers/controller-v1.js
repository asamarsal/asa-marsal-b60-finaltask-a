let blogs = [
    {
        title: "Squirtle",
        pokemontype: "Api dan Air",
        pokemontrainer: "Trainer 1",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    }
];

function renderBlog(req, res) {
    res.render("blog-list",  { blogs: blogs })
}

function createBlog(req, res) {
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
        pokemontrainer: pokemontrainer || newPokemonTrainer,
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    };

    blogs.push(newBlog);

    res.redirect("blog");
};

function renderBlogDetail(req, res) {
    const id = req.params.id;
    const blogYangDipilih = blogs[id];
    console.log(blogYangDipilih);
    res.render("blog-detail", { blog: blogYangDipilih });
}

function deleteBlog(req, res) {
    const id = req.params.id;
    const blogYangDipilih = blogs[id];
    console.log(blogYangDipilih);
    blogs.splice(id, 1);

    res.redirect("/blog");
}

module.exports = {
    renderBlog,
    createBlog,
    deleteBlog,
    renderBlogDetail,
}