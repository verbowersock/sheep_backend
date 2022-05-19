module.exports = (Conn, Sequelize) => {
  const Sheep = Conn.define(
    "sheep",
    {
      sheep_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      picture: {
        type: Sequelize.STRING.BINARY,
      },
      tag_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      scrapie_id: {
        type: Sequelize.STRING,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
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
          isIn: [["f", "m", "w"]],
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
      weight_at_birth: {
        type: Sequelize.INTEGER,
        validate: {
          isNumeric: true,
        },
      },
      date_deceased: {
        type: Sequelize.STRING,
      },
      breed_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      color_id: {
        type: Sequelize.BIGINT,
      },
      marking_id: {
        type: Sequelize.BIGINT,
      },
      date_last_bred: {
        type: Sequelize.STRING,
      },
    },
    { underscored: true }
  );

  return Sheep;
};
