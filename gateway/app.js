const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "employee", url: "http://localhost:9000/graphql" },
    { name: "restaurant", url: "http://localhost:9002/graphql" },
    { name: "administrator", url: "http://localhost:9001/graphql" },
    // other subgraphs can be included here
  ],
});

const server = new ApolloServer({
    gateway,
    subscriptions: false,
});
// start the gateway server
server.listen().then(({ url }) => {
  console.log(`Gateway ready at ${url}`);
});