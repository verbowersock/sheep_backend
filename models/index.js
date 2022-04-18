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
db.models = { Sheep, Breed };

Breed.hasMany(Sheep), { foreignKey: "breed_id" };
Sheep.belongsTo(Breed);
Sheep.hasMany(Sheep, { foreignKey: "dam", as: "dams_children" });
Sheep.hasMany(Sheep, { foreignKey: "sire", as: "sires_children" });
Sheep.belongsTo(Sheep, { foreignKey: "dam", as: "mother" });
Sheep.belongsTo(Sheep, { foreignKey: "sire", as: "father" });
module.exports = db;
