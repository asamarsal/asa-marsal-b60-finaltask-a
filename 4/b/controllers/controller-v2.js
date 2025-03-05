const {Sequelize} = require("sequelize");
const config = require("../config/config.json");
const { Hero, User, Type} = require("../models");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const sequelize = new Sequelize(config.development);

async function renderHome(req, res){
    const user = req.session.user;
    console.log(user);
    res.render("index", {user: user});
};

async function renderLogin(req, res){
    const user = req.session.user;

    if (user) {
        return res.redirect("/");
    } else {
        res.render("auth-login", {user: user});
    }

    res.render("auth-login", {user: user});
};

async function renderRegister(req, res){
    const user = req.session.user;

    if (user) {
        return res.redirect("/");
    } else {
        res.render("auth-register", {user: user});
    }

    res.render("auth-register", {user: user});
};

async function authLogin(req, res) {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (!user) {
        req.flash("error", "Email tidak ditemukan");
        return res.redirect("/login");
    }

    const isValidated = await bcrypt.compare(password, user.password);

    if (!isValidated) {
        req.flash("error", "Password tidak sesuai");
        return res.redirect("/login");
    }

    let loggedInUser = user.toJSON();
    delete loggedInUser.password;

    req.session.user = loggedInUser;

    req.flash("success", `Berhasil Login, Selamat datang ${loggedInUser.username}`);
    res.redirect("/");
}

async function authRegister(req, res) {
    const { username, email, password, confirmPassword } = req.body;

    console.log(username, email, password, confirmPassword);

    if (password !== confirmPassword) {
        req.flash("error", "Password dan confirm password tidak sesuai");
        return res.redirect("/register");
    }

    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (user) {
        req.flash("error", "Email sudah terdaftar");
        return res.redirect("/register");
    };

    const hashedPassword = await bcrypt.hashSync(password, saltRounds);

    const newUser ={
        username: username,
        email: email,
        password: hashedPassword
    };

    console.log("Hehe", newUser);

    const userInsert = await User.create(newUser);

    req.flash("success", "Berhasil register. Silahkan login");
    res.redirect("/login");
}

async function renderBlog(req, res) {
    const user = req.session.user;
    
    const blogs = await Hero.findAll({
        order: [['name', 'ASC']]
    });

    if (user){
        res.render("blog-list", { blogs: blogs, user: user});
    } else {
        res.render("blog-list", { blogs: blogs});
    }
}

async function authLogout(req, res) {
    req.session.user = null;
    res.redirect("/login");
}

async function renderBlogDetail(req, res) {
    const user = req.session.user;
    const id = req.params.id;
    const blogYangDipilih = await Hero.findOne({
        where: {
            id: id
        }
    });

    if (blogYangDipilih === null) {
        res.render("page-404");
    }
    else{
        res.render("blog-detail", { blog: blogYangDipilih, user: user });
    }
}

async function deleteBlog(req, res) {
    const {id} = req.params;

    const deleteResult = await Hero.destroy({
        where: {
            id: id
        }
    });

    res.redirect("/blog");
}

async function renderBlogCreate(req, res) {
    const user = req.session.user;
    if (user) {
        const types = await Type.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']]
        });

        res.render("blog-create", { 
            types: types,
            user: user 
        });
    } else {
        res.redirect("/login");
    }
}

async function createBlog(req, res) {
    const { title, pokemontype, pokemontrainer, newPokemonType, newPokemonTrainer } = req.body;
    const finalpokemontype = newPokemonType || pokemontype;
    const finalpokemontrainer = newPokemonTrainer || pokemontrainer;

    const photo = req.file ? `/uploads/${req.file.filename}` : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png";

    const newBlog = {
        name: title,
        type_id: finalpokemontype,
        user_id: finalpokemontrainer,
        photo: photo
    }

    const resultSubmit = await Hero.create(newBlog);

    res.redirect("/blog");
}

async function createType(req, res) {
    
    const { title } = req.body;
        
    const newType = await Type.create({
        name: title
    });

    req.flash("success", "Berhasil menambahkan tipe baru");

    res.redirect("/blog-type");
}

async function renderBlogEdit(req, res) {
    const user = req.session.user;
    const {id} = req.params;
    const blogYangDipilih = await Hero.findOne({
        where: {
            id: id
        }
    });

    if(!user) {
        return res.redirect("/login");
    }

    if (blogYangDipilih === null) {
        res.render("page-404");
    }
    else{
        res.render("blog-edit", { blog: blogYangDipilih, user: user });
    }

};

async function updateBlog(req, res) {
    const id = req.params.id;

    const { title, pokemontype, pokemontrainer, newPokemonType, newPokemonTrainer } = req.body;
    const finalpokemontype = newPokemonType || pokemontype;
    const finalpokemontrainer = newPokemonTrainer || pokemontrainer;

    const updateResult = await Hero.update({
        name: title,
        type_id: finalpokemontype,
        user_id: finalpokemontrainer
    }, {
        where: {
            id: id
        }
    });

    res.redirect("/blog");
};

async function renderError(req, res) {
    const user = req.session.user;
    res.render('page-404', {user: user});
}

async function renderBlogType(req, res) {
    const user = req.session.user;

    if (user) {
        const types = await Type.findAll({
            attributes: ['id', 'name'], 
            order: [['name', 'ASC']]
        });
    
        console.log('Types:', types);
    
        res.render("blog-type", { 
            types: types,
            user: user 
        });
    } else {
        res.redirect("/login");
    }
}

async function renderdeleteType(req, res) {
    const user = req.session.user;

    if (user) {
        const types = await Type.findAll({
            attributes: ['id', 'name'], 
            order: [['name', 'ASC']]
        });
    
        console.log('Types:', types);
    
        res.render("delete-type", { 
            types: types,
            user: user 
        });
    } else {
        res.redirect("/login");
    }
}

async function deleteType(req, res) {
        const { id } = req.params;
        
        await Type.destroy({
            where: { id: id }
        });

        req.flash("success", "Type berhasil dihapus");
        res.redirect("/delete-type");
}

module.exports = {
    renderHome,
    renderLogin,
    renderRegister,
    authLogin,
    authRegister,
    authLogout,
    renderBlog,
    renderBlogDetail,
    renderBlogCreate,
    createBlog,
    deleteBlog,
    renderBlogEdit,
    updateBlog,
    renderBlogType,
    createType,
    renderdeleteType,
    deleteType,
    renderError,
}