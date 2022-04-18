module.exports = (Conn, Sequelize) => {
  const Sheep = Conn.define(
    "sheep",
    {
      sheep_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      tag_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["f", "m"]],
          notEmpty: false,
        },
      },
      sire: {
        type: Sequelize.BIGINT,
        validate: {
          isNumeric: true,
        },
      },
      dam: {
        type: Sequelize.BIGINT,
        validate: {
          isNumeric: true,
        },
      },
      purchase_date: {
        type: Sequelize.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      breed_id: {
        type: Sequelize.BIGINT,
      },
    },
    { underscored: true }
  );

  return Sheep;
};
