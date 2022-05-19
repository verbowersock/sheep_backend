module.exports = (Conn, Sequelize) => {
  const Marking = Conn.define(
    "markings",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      marking_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { underscored: true, timestamps: false }
  );
  return Marking;
};
