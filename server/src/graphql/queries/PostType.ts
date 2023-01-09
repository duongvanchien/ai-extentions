import { GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql';

const mongoose = require('mongoose');
const Author = require('../../models/Author');
const AuthorType = require('./AuthorType');

const PostType = new GraphQLObjectType({
    name: 'PostType',
    description: "This is resent post",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        author_id: { type: GraphQLString },
        author: {
            type: AuthorType, resolve: async function (post: any) {
                var authors = await Author.findById(
                    mongoose.Types.ObjectId(post.author_id))
                if (!authors) {
                    throw new Error('Error')
                }
                return authors
            }
        }
    })
});

module.exports = PostType