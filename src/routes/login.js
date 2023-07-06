const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          const message = "L'utilisateur demander n'existe pas";
          return res.status(404).json({ message });
        }

        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `le mot de passe n'est pas correct`;
              return res.status(401).json({ message });
            }

            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user });
          });
      })
      .catch((error) => {
        const message =
          "l'utilisateur n'a pas pu etre connecte. Reessayez plus tard";
        return res.json({ message, data: error });
      });
  });
};
