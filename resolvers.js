const db = require("./models/index");
const { UserInputError } = require("apollo-server");
const validator = require("validator");
const { GraphQLUpload } = require("graphql-upload");
const { createUploadStream } = require("./stream.js");
const { v4: uuid } = require("uuid");

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
            as: "breed",
          },
          {
            model: Sheep,
            as: "mother",
            include: [
              { model: Breed, as: "breed" },
              { model: Color, as: "color" },
              { model: Marking, as: "marking" },
            ],
          },
          {
            model: Sheep,
            as: "father",
            include: [
              { model: Breed, as: "breed" },
              { model: Color, as: "color" },
              { model: Marking, as: "marking" },
            ],
          },
          { model: Color, as: "color" },
          { model: Marking, as: "marking" },
        ],
      });
    },
    get_sheep_by_id: async (root, { sheep_id }) => {
      const validationErrors = {};
      if (Object.keys(validationErrors).length > 0) {
        throw new UserInputError(
          "Failed to get events due to validation errors",
          { validationErrors }
        );
      }
      const sheep = await Sheep.findByPk(sheep_id, {
        include: [
          "dam_lambs",
          "sire_lambs",
          {
            model: Breed,
            as: "breed",
          },
          { model: Color, as: "color" },
          { model: Marking, as: "marking" },
          {
            model: Sheep,
            as: "mother",
            include: [
              {
                model: Breed,
                as: "breed",
              },
              { model: Color, as: "color" },
              { model: Marking, as: "marking" },
            ],
          },
          {
            model: Sheep,
            as: "father",
            include: [
              { model: Breed, as: "breed" },
              { model: Color, as: "color" },
              { model: Marking, as: "marking" },
            ],
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
            as: "breed",
          },
          { model: Color, as: "color" },
          { model: Marking, as: "marking" },
          {
            model: Sheep,
            as: "mother",
            include: [
              {
                model: Breed,
                as: "breed",
              },
              { model: Color, as: "color" },
              { model: Marking, as: "marking" },
            ],
          },
          {
            model: Sheep,
            as: "father",
            include: [
              { model: Breed, as: "breed" },
              { model: Color, as: "color" },
              { model: Marking, as: "marking" },
            ],
          },
        ],
      });
      return sheep;
    },
    get_all_females: async (_, { sex }) => {
      return await Sheep.findAll({
        where: { sex: "f" },
      });
    },
    get_all_males: async (_, { sex }) => {
      return await Sheep.findAll({
        where: { sex: "m" },
      });
    },
    get_all_breeds: async () => {
      return await Breed.findAll();
    },
    get_all_colors: async () => {
      return await Color.findAll();
    },
    get_all_markings: async () => {
      return await Marking.findAll();
    },
  },
  Mutation: {
    createSheep: async (
      _,
      {
        picture,
        tag_id,
        dob,
        sex,
        purchase_date,
        breed_id,
        dam,
        sire,
        color_id,
        marking_id,
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

      if (Object.keys(validationErrors).length > 0) {
        throw new UserInputError(
          "Failed to get events due to validation errors",
          { validationErrors }
        );
      }
      await Sheep.create({
        picture,
        tag_id,
        dob,
        sex,
        purchase_date,
        breed_id,
        dam,
        sire,
        color_id,
        marking_id,
        scrapie_id,
        name,
        weight_at_birth,
        date_deceased,
        date_last_bred,
      });

      return await Sheep.findOne({
        where: { tag_id },

        include: [
          {
            model: Breed,
            as: "breed",
          },
          { model: Color, as: "color" },
          { model: Marking, as: "marking" },
          {
            model: Sheep,
            as: "mother",
            include: [
              {
                model: Breed,
                as: "breed",
              },
              { model: Color, as: "color" },
              { model: Marking, as: "marking" },
            ],
          },
          {
            model: Sheep,
            as: "father",
            include: [
              { model: Breed, as: "breed" },
              { model: Color, as: "color" },
              { model: Marking, as: "marking" },
            ],
          },
        ],
      });
    },
    updateSheep: async (
      _,
      {
        sheep_id,
        picture,
        tag_id,
        dob,
        sex,
        purchase_date,
        breed_id,
        dam,
        sire,
        color_id,
        marking_id,
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

      if (Object.keys(validationErrors).length > 0) {
        throw new UserInputError(
          "Failed to get events due to validation errors",
          { validationErrors }
        );
      }
      await Sheep.update(
        {
          picture,
          tag_id,
          dob,
          sex,
          purchase_date,
          breed_id,
          dam,
          sire,
          color_id,
          marking_id,
          scrapie_id,
          name,
          weight_at_birth,
          date_deceased,
          date_last_bred,
        },
        { where: { sheep_id: sheep_id } }
      );
      return await Sheep.findOne({
        where: { sheep_id },

        include: [
          {
            model: Breed,
            as: "breed",
          },
          { model: Color, as: "color" },
          { model: Marking, as: "marking" },
          {
            model: Sheep,
            as: "mother",
            include: [
              {
                model: Breed,
                as: "breed",
              },
              { model: Color, as: "color" },
              { model: Marking, as: "marking" },
            ],
          },
          {
            model: Sheep,
            as: "father",
            include: [
              { model: Breed, as: "breed" },
              { model: Color, as: "color" },
              { model: Marking, as: "marking" },
            ],
          },
        ],
      });
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
      return await Breed.create({
        breed_name,
      });
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

    createColor: async (_, { color_name }) => {
      return await Color.create({
        color_name,
      });
    },
    deleteColor: async (root, { id }) => {
      const color = await Color.findOne({ where: { id } });
      if (!color) {
        throw new Error("Color not found!");
      }
      await Color.destroy({
        where: {
          id: id,
        },
      });
      return true;
    },
    createMarking: async (_, { marking_name }) => {
      return await Marking.create({
        marking_name,
      });
    },
    deleteMarking: async (root, { id }) => {
      const marking = await Marking.findOne({ where: { id } });
      if (!marking) {
        throw new Error("Marking not found!");
      }
      await Marking.destroy({
        where: {
          id: id,
        },
      });
      return true;
    },
  },
  // resolvers.js
};

module.exports = resolvers;
