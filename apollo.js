const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} = require("@apollo/gateway");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const gateway = new ApolloGateway({
  
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      // { name: "login_svc", url: "http://localhost:8080/graphql" },
      // { name: "product_svc", url: "http://localhost:8081/graphql" },
      // { name: "location_svc", url: "http://localhost:8082/graphql" },
      // { name: "report_svc", url: "http://localhost:8083/graphql" },


      { name: "login_svc", url: "https://login-svc.onrender.com/playground" },
      { name: "product_svc", url: "https://product-svc.onrender.com/playground" },
      { name: "location_svc", url: "https://location-svc.onrender.com/playground" },
      { name: "report_svc", url: "https://report-svc.onrender.com/playground" },
      

      
      
 
    ],
  }),
});

(async () => {
  const server = new ApolloServer({
    gateway,
    introspection: true,
    playground: true,
    //Apollo Graph Manager (previously known as Apollo Engine)
    //when enabled and an `ENGINE_API_KEY` is set in the environment,
    //provides metrics, schema management and trace reporting.
    engine: false,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],

    // Subscriptions are unsupported but planned for a future Gateway version.
    subscriptions: false,
  });

  await server.start();
  const app = express();
  server.applyMiddleware({ app, path: "/", cors: true });

  await app.listen(55009, function (err) {
    if (err) console.log("Error in server setup.");
    console.log("server listening on port", 55009);
  });
  // server.listen().then(({ url }) => {
  //   console.log(`server ready at ${url}`);
  // });
})();
