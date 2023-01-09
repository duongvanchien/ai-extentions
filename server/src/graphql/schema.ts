import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const mutation = require('./mutations/index');
const BlogQueryRootType = require('./queries/index');

const BlogAppSchema = new GraphQLSchema({
    query: BlogQueryRootType,
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutation
    })
});

module.exports = BlogAppSchema;