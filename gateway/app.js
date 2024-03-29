import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "apollo-server";
import FileUploadDataSource from '@profusion/apollo-federation-upload';
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "employee", url: "http://localhost:9000/graphql" },
      { name: "restaurant", url: "http://localhost:9002/graphql" },
      { name: "administrator", url: "http://localhost:9001/graphql" },
      // other subgraphs can be included here
    ],
  })
});

const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({ req }) => {
      return { req }
    },
});
// start the gateway server
server.listen().then(({ url }) => {
  console.log(`Gateway ready at ${url}`);
});