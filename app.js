const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(bodyParser.json())
  .use(cors());

app.get("/api/home", (req, res) => {
  res.json("Hello Heroku from Heraur");
});

sequelize.initDb();

//Ici nous placerons nos futures points de terminaison

require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);

//on ajoute la gestion des erreurs

app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressources demandee! , Vous pouvez essayer une autre URL";
  res.status(404).json({ message });
});

app.listen(port, () => console.log(`notre appli au http://localhost:${port}`));
