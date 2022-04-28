const { isInteger, isDate } = require("lodash");
const db = require("./models/index");
const { UserInputError } = require("apollo-server");
const validator = require("validator");

const Sheep = db.models.Sheep;
const Breed = db.models.Breed;
const Color = db.models.Color;
const Marking = db.models.Marking;
const resolvers = {
  Query: {
    get_all_sheep: async () => {
      return await Sheep.findAll({
        include: [
          {
            model: Breed,
          },
          {
            model: Sheep,
            as: "mother",
            include: [{ model: Breed }, { model: Color }, { model: Marking }],
          },
          {
            model: Sheep,
            as: "father",
            include: [{ model: Breed }, { model: Color }, { model: Marking }],
          },
          { model: Color },
          { model: Marking },
        ],
      });
    },
    get_sheep_by_id: async (root, { sheep_id }) => {
      const validationErrors = {};
      if (!isInteger(sheep_id)) {
        validationErrors.sheep_id = "This is not a valid id";
      }
      if (Object.keys(validationErrors).length > 0) {
        throw new UserInputError(
          "Failed to get events due to validation errors",
          { validationErrors }
        );
      }
      const sheep = await Sheep.findByPk(sheep_id, {
        include: [
          {
            model: Breed,
          },
          { model: Color },
          { model: Marking },
          {
            model: Sheep,
            as: "mother",
            include: [{ model: Breed }, { model: Color }, { model: Marking }],
          },
          {
            model: Sheep,
            as: "father",
            include: [{ model: Breed }, { model: Color }, { model: Marking }],
          },
        ],
      });
      return sheep;
    },
    get_sheep_by_tag: async (root, { tag_id }) => {
      const sheep = await Sheep.findOne({
        where: { tag_id },

        include: [
          {
            model: Breed,
          },
          { model: Color },
          { model: Marking },
          {
            model: Sheep,
            as: "mother",
            include: [{ model: Breed }, { model: Color }, { model: Marking }],
          },
          {
            model: Sheep,
            as: "father",
            include: [{ model: Breed }, { model: Color }, { model: Marking }],
          },
        ],
      });
      return sheep;
    },
    get_all_breeds: async () => {
      return await Breed.findAll();
    },
  },
  Mutation: {
    createSheep: async (
      _,
      {
        tag_id,
        dob,
        sex,
        purchase_date,
        breed_id,
        mother,
        father,
        color,
        marking,
        scrapie_id,
        name,
        weight_at_birth,
        date_deceased,
        date_last_bred,
      }
    ) => {
      const validationErrors = {};

      if (dob && !validator.isISO8601(dob)) {
        console.log(dob);
        validationErrors.dob = "This is not a valid date";
      }
      if (purchase_date && !validator.isISO8601(purchase_date)) {
        validationErrors.purchase_date = "This is not a valid purchase date";
      }
      //if (breed && !isInteger(breed)) {
      //  validationErrors.sex = "This is not a valid breed";
      // }
      if (father && !isInteger(father)) {
        validationErrors.father = "This is not a valid sire";
      }
      if (mother && !isInteger(mother)) {
        validationErrors.mother = "This is not a valid dam";
      }
      if (Object.keys(validationErrors).length > 0) {
        throw new UserInputError(
          "Failed to get events due to validation errors",
          { validationErrors }
        );
      }

      return Sheep.create({
        tag_id,
        dob,
        sex,
        purchase_date,
        breed_id,
        mother,
        father,
        color,
        marking,
        scrapie_id,
        name,
        weight_at_birth,
        date_deceased,
        date_last_bred,
      });
    },
    updateSheep: async (
      _,
      {
        sheep_id,
        tag_id,
        dob,
        sex,
        purchase_date,
        breed_id,
        mother,
        father,
        color,
        marking,
        scrapie_id,
        name,
        weight_at_birth,
        date_deceased,
        date_last_bred,
      }
    ) => {
      const validationErrors = {};

      if (dob && !validator.isISO8601(dob)) {
        console.log(dob);
        validationErrors.dob = "This is not a valid date";
      }

      if (purchase_date && !validator.isISO8601(purchase_date)) {
        validationErrors.purchase_date = "This is not a valid purchase date";
      }
      if (breed_id && !isInteger(breed_id)) {
        validationErrors.sex = "This is not a valid breed";
      }
      if (father && !isInteger(father)) {
        validationErrors.father = "This is not a valid sire";
      }
      if (mother && !isInteger(mother)) {
        validationErrors.mother = "This is not a valid dam";
      }
      if (Object.keys(validationErrors).length > 0) {
        throw new UserInputError(
          "Failed to get events due to validation errors",
          { validationErrors }
        );
      }
      return Sheep.update(
        {
          tag_id,
          dob,
          sex,
          purchase_date,
          breed_id,
          mother,
          father,
          color,
          marking,
          scrapie_id,
          name,
          weight_at_birth,
          date_deceased,
          date_last_bred,
        },
        { where: { sheep_id: sheep_id } }
      );
      //  return `sheep ${breed} updated`;
    },
    deleteSheep: async (root, { sheep_id }) => {
      const sheep = await Sheep.findOne({ where: { sheep_id } });
      if (!sheep) {
        throw new Error("Sheep not found!");
      }
      await Sheep.destroy({
        where: {
          sheep_id: sheep_id,
        },
      });
      return true;
    },
    createBreed: async (_, { breed_name }) => {
      await Breed.create({
        breed_name,
      });
      return `breed ${breed_name} created`;
    },
    updateBreed: async (_, { id, breed_name }) => {
      await Breed.update(
        {
          id,
          breed_name,
        },
        { where: { id: id } }
      );
      return `breed ${id} updated`;
    },
    deleteBreed: async (root, { id }) => {
      const breed = await Breed.findOne({ where: { id } });
      if (!breed) {
        throw new Error("Breed not found!");
      }
      await Breed.destroy({
        where: {
          id: id,
        },
      });
      return true;
    },
  },
};

module.exports = resolvers;
