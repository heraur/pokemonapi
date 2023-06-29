const express = require("express");
const { success } = require("./helper");
let pokemons = require("./mock-pokemons");

const app = express();
const port = 3000;

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

app.listen(port, () => console.log(`notre appli au http://localhost:${port}`));
