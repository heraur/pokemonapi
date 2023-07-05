const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      return Pokemon.findAndCountAll({
        where: {
          name: {
            //'name' est la propriete du modele pokemon
            [Op.like]: `%${name}%`, // 'name' est le critere de recherche
          },
        },
        order: ["name"],
        limit: 5,
      }).then(({ count, rows }) => {
        const message = `Il y'a ${count} pokemons correspondant au terme de recherche ${name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] })
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message =
            "La liste des pokemons n'a pas pu etre recuperee. Reessayer dans quelques instant";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
