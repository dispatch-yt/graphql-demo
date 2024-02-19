const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

const typeDefs = gql`
  type Post {
    userId: Int
    id: Int
    title: String
    body: String
  }

  input PostInput {
    title: String!
    body: String!
  }

  type Query {
    getPost(id: Int!): Post
    getAllPosts: [Post]
  }

  type Mutation {
    createPost(input: PostInput!): Post
  }
`;

const resolvers = {
  Query: {
    getPost: async (_, { id }) => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching post with ID ${id}: ${error.message}`);
      }
    },
    getAllPosts: async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching all posts: ${error.message}`);
      }
    },
  },
  Mutation: {
    createPost: async (_, { input }) => {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', input);
        return response.data;
      } catch (error) {
        throw new Error(`Error creating post: ${error.message}`);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer().then(() => {
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
