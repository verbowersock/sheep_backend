const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const Conn = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = Conn;
const Sheep = require("./sheep.model.js")(Conn, Sequelize);
const Breed = require("./breed.model")(Conn, Sequelize);
const Color = require("./color.model")(Conn, Sequelize);
const Marking = require("./marking.model")(Conn, Sequelize);
db.models = { Sheep, Breed, Color, Marking };

Breed.hasMany(Sheep, {
  foreignKey: "breed_id",
  onDelete: "RESTRICT",
});
Sheep.belongsTo(Breed, {
  foreignKey: "breed_id",
  onDelete: "RESTRICT",
}),
  Color.hasMany(Sheep, {
    foreignKey: "color_id",
    onDelete: "RESTRICT",
  });
Sheep.belongsTo(Color, {
  foreignKey: "color_id",
  onDelete: "RESTRICT",
});
Marking.hasMany(Sheep, { foreignKey: "marking_id", onDelete: "RESTRICT" });
Sheep.belongsTo(Marking, { foreignKey: "marking_id", onDelete: "RESTRICT" });
Sheep.hasMany(Sheep, {
  foreignKey: "dam",
  as: "dam_lambs",
  onDelete: "RESTRICT",
});
Sheep.hasMany(Sheep, {
  foreignKey: "sire",
  as: "sire_lambs",
  onDelete: "RESTRICT",
});
Sheep.belongsTo(Sheep, {
  foreignKey: "dam",
  as: "mother",
  onDelete: "RESTRICT",
});
Sheep.belongsTo(Sheep, {
  foreignKey: "sire",
  as: "father",
  onDelete: "RESTRICT",
});
module.exports = db;
