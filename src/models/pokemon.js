const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "le nom est deja pris" },
        validate: {
          notEmpty: { msg: "Le nom ne peut pas etre vide" },
          notNull: { msg: "Le nom est une propriete requise" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "utilisez uniquement les entiers pour les points de vie",
          },
          notNull: { msg: "Les points de vie sont une propiete requise" },
          min: {
            args: [0],
            msg: "les point de vie doivent etre entre 0 et 999",
          },
          max: {
            args: [999],
            msg: "les point de vie doivent etre entre 0 et 999",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "utilisez uniquement les entiers pour les points de degats",
          },
          notNull: { msg: "Les points de degats sont une propiete requise" },
          min: {
            args: [0],
            msg: "les point de degats doivent etre entre 0 et 99",
          },
          max: {
            args: [99],
            msg: "les point de degats doivent etre entre 0 et 99",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "le lien doit etre du type http://monpokemon.com" },
          notNull: { msg: "Le lien est une propriete requise" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        //getter ete setter pour convertir tableau et string et vice verse
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypedValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit au moins avoir un type ");
            }
            if (value.split(",").length > 3) {
              throw new Error("Un pokemon ne peux pas avoir plus de 3 types");
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokemon appartenir a la liste suivante:  ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
