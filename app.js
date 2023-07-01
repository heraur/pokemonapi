const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { success, getUniqueId } = require("./helper");
let pokemons = require("./mock-pokemons");

const app = express();
const port = 3000;

//middleware
// app.use((req, res, next) => {
//   console.log(`URL:${req.url}`);
//   next();
// });

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

//get all the pokemons
app.get("/api/pokemons", (req, res) => {
  const message = "la liste a bien ete recuperee";
  res.json(success(message, pokemons));
});

// find a pokemon by id
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Un pokemon a bien ete trouve.";
  res.json(success(message, pokemon));
});

// add new pokemons
app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokemon ${pokemonCreated.name} a bien ete cree`;
  res.json(success(message, pokemonCreated));
});

//modified a pokemon by PK
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });
  const message = `Le pokemon ${pokemonUpdated.name} a bien ete modifie`;

  res.json(success(message, pokemonUpdated));
});

//delete a pokemon
app.delete("api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  console.log(pokemonDeleted);
  pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokemon ${pokemonDeleted.name} a bien ete supprimer`;
  res.json(success(message, pokemonDeleted));
});

app.listen(port, () => console.log(`notre appli au http://localhost:${port}`));
