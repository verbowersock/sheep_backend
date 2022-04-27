const express = require("express");
const fakeBreeds = require("./fakeBreeds");
const fakeSheep = require("./fakeSheep");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
//config

const APP_PORT = 4000;
async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  const db = require("./models");

  db.sequelize
    .sync({ force: true })
    .then(() => db.models.Breed.bulkCreate(fakeBreeds))
    .then(() => db.models.Sheep.bulkCreate(fakeSheep));
  app.listen(APP_PORT, () => {
    console.log(`App listening on port ${APP_PORT}`);
  });
}
startServer();
