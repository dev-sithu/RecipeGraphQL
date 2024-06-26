import Author from "../models/Author.js";
import Recipe from "../models/Recipe.js";
import Review from "../models/Review.js";

export const authorResolvers = {
    Query: {
        // return a single Author by id
        async author(_, {id}) {
            return Author.findById(id);
        },
        // return a list of Authors
        async authors(_, {limit}) {
            return Author.find().sort({name: 1}).limit(limit);
        }
    },
    Author: {
        async reviews(author) {
            return Review.find({ authorId: author });
        }
    },
    Mutation: {
        // insert an Author
        async createAuthor(_, { input }, context) {
            const createdAuthor = new Author(input);
            const res = await createdAuthor.save();
            return {
                id: res.id,
                ...res._doc
            };
        }
    }
}
