import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { buildSchema } from "graphql";
import { graphqlHTTP } from 'express-graphql';
import { UsersData } from "./data";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);
app.use(cors(), bodyParser.json());
console.log(UsersData)
const typeDefs = buildSchema(`
    interface User {
        id: Int!,
        name: String!,
        age: Int!
    }

    type Query {
        users: [User!]  
    }
`);

const resolvers = {
    Query: {
        users: () => UsersData
    }
};

app.use('/graphql', graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
}));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
