const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
let Conn;
if (env === "production") {
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(":"));
  const password = dbUrl.auth.substr(
    dbUrl.auth.indexOf(":") + 1,
    dbUrl.auth.length
  );
  const dbName = dbUrl.path.slice(1);
  const host = dbUrl.hostname;
  const { port } = dbUrl;
  config.host = host;
  config.port = port;
  Conn = new Sequelize(dbName, username, password, config);
}

// If env is not production, retrieve DB auth details from the config
else {
  Conn = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  });
}
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
