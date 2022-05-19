const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Sheep {
    sheep_id: Int!
    picture: String
    tag_id: String!
    scrapie_id: String
    name: String!
    weight_at_birth: Int
    date_deceased: String
    dob: String
    sex: String!
    purchase_date: String
    father: Sheep
    mother: Sheep
    breed: Breed!
    color: Color
    marking: Marking
    date_last_bred: String
    created_at: String
    updated_at: String
    dams_lambs: [Sheep]
    sire_lambs: [Sheep]
  }
  type Breed {
    id: Int!
    breed_name: String!
  }
  type Color {
    id: Int!
    color_name: String!
  }
  type Marking {
    id: Int!
    marking_name: String!
  }

  type Query {
    get_sheep_by_id(sheep_id: Int!): Sheep
    get_sheep_by_tag(tag_id: String!): Sheep
    get_all_sheep: [Sheep!]!
    get_all_females: [Sheep!]!
    get_all_males: [Sheep!]!
    get_all_breeds: [Breed!]!
    get_all_colors: [Color!]!
    get_all_markings: [Marking!]!
  }
  type Mutation {
    createSheep(
      tag_id: String!
      dob: String!
      sex: String!
      purchase_date: String
      breed_id: Int!
      dam: Int
      sire: Int
      color_id: Int
      marking_id: Int
      scrapie_id: String
      name: String!
      weight_at_birth: Int
      date_deceased: String
    ): Sheep!

    updateSheep(
      sheep_id: Int!
      tag_id: String
      dob: String
      sex: String
      purchase_date: String
      breed_id: Int
      dam: Int
      sire: Int
      color_id: Int
      marking_id: Int
      scrapie_id: String
      name: String
      weight_at_birth: Int
      date_deceased: String
      date_last_bred: String
    ): Sheep!

    deleteSheep(sheep_id: Int!): String

    createBreed(breed_name: String!): Breed!

    updateBreed(id: Int!, breed_name: String!): String

    deleteBreed(id: Int!): String

    createColor(color_name: String!): Color!

    updateColor(id: Int!, color_name: String!): String

    deleteColor(id: Int!): String

    createMarking(marking_name: String!): Marking

    updateMarking(id: Int!, marking_name: String!): String

    deleteMarking(id: Int!): String
  }
`;

module.exports = typeDefs;
