const express = require("express");
const fakeBreeds = require("./fakeBreeds");
const fakeSheep = require("./fakeSheep");
const fakeColors = require("./fakeColors");
const fakeMarkings = require("./fakeMarkings");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { graphqlUploadExpress } = require("graphql-upload");
var cors = require("cors");

//config

const APP_PORT = 4000;
async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.use(graphqlUploadExpress());
  app.use(cors());
  const db = require("./models");

  db.sequelize
    .sync()
    //  .then(() => db.models.Breed.bulkCreate(fakeBreeds))
    //  .then(() => db.models.Color.bulkCreate(fakeColors))
    //  .then(() => db.models.Marking.bulkCreate(fakeMarkings))
    //  .then(() => db.models.Sheep.bulkCreate(fakeSheep))
    .catch((err) => console.log(err));

  app.listen({ port: process.env.PORT || APP_PORT }, () => {
    console.log(`App listening on port ${APP_PORT}`);
  });
}
startServer();
