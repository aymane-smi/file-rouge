import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
    // link: createUploadLink({
    //     uri: "http://localhost:4000",
    // }),
});

export default client;