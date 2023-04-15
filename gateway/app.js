import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "apollo-server";
import FileUploadDataSource from '@profusion/apollo-federation-upload';
class test extends RemoteGraphQLDataSource{
  async willSendRequest({req, context}){
    console.log(context)
    console.log(req);
  }
}
const gateway = new ApolloGateway({
  buildService: ({ url, name, requestContext }) => {
    console.log(requestContext);
    return new test({url});
  },
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
    debug: true,
    context: ({ req }) => ({ req }),
    uploads: false,
});
// start the gateway server
server.listen().then(({ url }) => {
  console.log(`Gateway ready at ${url}`);
});