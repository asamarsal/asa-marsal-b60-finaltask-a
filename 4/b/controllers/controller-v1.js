const {Sequelize, QueryTypes} = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);

let blogs = [
    {
        title: "Squirtle",
        pokemontype: "Api dan Air",
        pokemontrainer: "Trainer 1",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    }
];

async function renderBlog(req, res) {
    const users = await sequelize.query("SELECT * FROM heroes_tb ORDER BY name ASC", {
        type: QueryTypes.SELECT,
    });
    // console.log(users);
    res.render("blog-list",  { blogs: users })
}

async function createBlog(req, res) {
    const { title, pokemontype, pokemontrainer, newPokemonType, newPokemonTrainer } = req.body;
    const finalpokemontype = newPokemonType || pokemontype;
    const finalpokemontrainer = newPokemonTrainer || pokemontrainer;
    
    console.log({
        "Judulnya" : title,
        "Type 1" : pokemontype,
        "Type 2" : newPokemonType,
        "Trainer 1" : pokemontrainer,
        "Trainer 2" : newPokemonTrainer
    });

    let query = `
        INSERT INTO heroes_tb (name, type_id, user_id, photo)
        VALUES ('${title}', '${finalpokemontype}', '${finalpokemontrainer}', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png')`;

    const newblogs = await sequelize.query(query, {
        type: QueryTypes.INSERT,
    });

    // blogs.push(newBlog);

    res.redirect("blog");
};

async function renderBlogEdit(req, res) {
    const id = req.params.id;
    
    const query = `SELECT * FROM heroes_tb WHERE id = ${id}`;
    const blogYangDipilih = await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });
    console.log(blogYangDipilih);


    res.render("blog-edit", {blog: blogYangDipilih[0] });
}

async function updateBlog(req, res) {
    const id = req.params.id;
    const { title, pokemontype, pokemontrainer, newPokemonType, newPokemonTrainer } = req.body;
    console.log({
        "Judul Baru" : title,
        "Type Baru 1" : pokemontype,
        "Type Baru 2" : newPokemonType,
        "Trainer Baru 1" : pokemontrainer,
        "Trainer Baru 2" : newPokemonTrainer
    });

    const query = `UPDATE "heroes_tb" SET name = '${title}', 
        type_id = '${pokemontype || newPokemonType}', 
        user_id = '${pokemontrainer || newPokemonTrainer}' 
        WHERE id = ${id}`;
        
    const updateResult = await sequelize.query(query, {
        type: QueryTypes.UPDATE,
    });

    res.redirect("/blog");
}

async function renderBlogDetail(req, res) {
    const id = req.params.id;

    const query = `SELECT * FROM heroes_tb WHERE id = ${id}`;
    const blogYangDipilih = await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });
    console.log(blogYangDipilih);

    res.render("blog-detail", { blog: blogYangDipilih[0] });
}

async function deleteBlog(req, res) {
    const id = req.params.id;

    const query = `DELETE FROM heroes_tb WHERE id = ${id}`;

    const deleteResult = await sequelize.query(query, {
        type: QueryTypes.DELETE,
    });

    console.log("Result : ",deleteResult);

    res.redirect("/blog");
}

module.exports = {
    renderBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    renderBlogDetail,
    renderBlogEdit,
}