import "reflect-metadata";

// For the mikro ORM
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
//import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";

// For express and graphQL
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

// Routes
import indexRouter from "./routes/indexRoutes";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  // Initialize DB
  const orm = await MikroORM.init(microConfig);
  // Run migration
  await orm.getMigrator().up();

  const app = express();
  // index routes
  app.use("/", indexRouter);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        PostResolver,
        UserResolver
    ],
      validate: false,
    }),
    context: () => ({ em: orm.em.fork() }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started and listening on localhost:4000");
  });

  // orm.em = ORM Entity Manager
  //const entityManager = orm.em.fork();
  // way 1
  // const post = entityManager.create(Post, {title: 'My first post'});
  // await entityManager.persistAndFlush(post);

  // way 2
  //await entityManager.nativeInsert(Post, {title: 'My second post'})

  // SLECT * FROM POSTS;
  // const posts = await entityManager.find(Post, {});
  // console.log(posts);
};

main().catch((error) => console.error(error));
