const db = require("./models/index.js");

const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
console.log(db.sheep);
const Sheep = new GraphQLObjectType({
  name: "Sheep",
  description: "This represents an individual sheep",
  fields: () => {
    return {
      sheep_id: {
        type: GraphQLInt,
        resolve(sheep) {
          return sheep.sheep_id;
        },
      },
      tag_id: {
        type: GraphQLString,
        resolve(sheep) {
          return sheep.tag_id;
        },
      },
      dob: {
        type: GraphQLString,
        resolve(sheep) {
          return sheep.dob;
        },
      },
      sex: {
        type: GraphQLString,
        resolve(sheep) {
          return sheep.sex;
        },
      },
      purchase_date: {
        type: GraphQLString,
        resolve(sheep) {
          return sheep.purchase_date;
        },
      },
      sire: {
        type: GraphQLString,
        resolve(sheep) {
          return sheep.sire;
        },
      },
      dam: {
        type: GraphQLString,
        resolve(sheep) {
          return sheep.dam;
        },
      },
    };
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  description: "This is a root query",
  fields: () => {
    return {
      all_sheep: {
        type: new GraphQLList(Sheep),
        args: {
          sheep_id: {
            type: GraphQLInt,
          },
          tag_id: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          return db.sheep.findAll({ where: args });
        },
      },
    };
  },
});

const Schema = new GraphQLSchema({
  query: Query,
});

exports.Schema = Schema;
