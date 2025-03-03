--[[[[[users_tb]]]]]--

-- //Create Table//
CREATE TABLE users_tb (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- //Insert Data ke Table users_tb//
INSERT INTO public.users_tb(
	email, username, password)
	VALUES 
    ('nasigoreng@gmail.com', 'nasigoreng', '123'),
    ('seblak@gmail.com', 'seblak', '123');

-- Atau --

INSERT INTO users_tb (email, username, password) VALUES
('ayamgoreng@gmail.com', 'ayamgoreng', '123'),
('bakso@gmail.com', 'bakso', '123'),
('soto@gmail.com', 'soto', '1234');
-----------------------------------------------------------------

--[[[[[heroes_tb]]]]]--

-- //Create Table// --
CREATE TABLE heroes_tb (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type_id VARCHAR(50) NOT NULL,
    photo VARCHAR(255) NOT NULL,
    user_id INT NOT NULL
);

-- //Insert Data ke Table heroes_tb//
INSERT INTO public.heroes_tb(
	name, type_id, photo, user_id)
	VALUES 
    ('charizard', 'fire', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', '1'),
    ('squirtle', 'water', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', '2');

-- Atau --

INSERT INTO heroes_tb (name, type_id, photo, user_id) VALUES
('rattata', 'earth', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png', '1'),
('pikachu', 'electric', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', '2'),
('bulbasaur', 'grass', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', '3');

-----------------------------------------------------------------

--[[[[[type_tb]]]]]--

-- //Create Table//

CREATE TABLE type_tb (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- //Insert Data ke Table type_tb//

INSERT INTO public.type_tb(
	name)
	VALUES 
    ('earth'),
    ('fire'),
    ('water'),

-- Atau --

INSERT INTO type_tb (name) VALUES
('electric'),
('grass');
-----------------------------------------------------------------