const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require('express-graphql');
const { UsersData } = require("./data");
const schema = require('./src/graphql/schema');

dotenv.config();
const app = express();

app.use(logger("dev"));
app.use(cors(), bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

mongoose.connect('mongodb+srv://jindo:chien1003@cluster0.xwr7j.mongodb.net/extentions?retryWrites=true&w=majority')
    .then(() => {
        console.log('Database connected');
    })
    .catch((error: any) => {
        console.log('Error connecting to database');
    });

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
