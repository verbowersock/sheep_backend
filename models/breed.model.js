module.exports = (Conn, Sequelize) => {
  const Breed = Conn.define(
    "breeds",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      breed_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { underscored: true, timestamps: false }
  );
  return Breed;
};
