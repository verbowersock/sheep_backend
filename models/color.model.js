module.exports = (Conn, Sequelize) => {
  const Color = Conn.define(
    "colors",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      color_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { underscored: true, timestamps: false }
  );
  return Color;
};
