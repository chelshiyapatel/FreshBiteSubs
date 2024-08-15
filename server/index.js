const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Order = require('./Model/Order'); //3
const Product = require('./Model/Product'); //4

// Below line is to load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());

// Below code is to define the GraphQL schema
// Reference: https://conestoga.desire2learn.com/d2l/le/content/1001970/viewContent/21346158/View 
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: String!
  }

  input OrderInput {
    customerName: String!
    address: String!
    city: String!
    postalCode: String!
    items: [OrderItemInput!]!
  }

  input OrderItemInput {
    name: String!
    price: Float!
    quantity: Int!
    toppings: String
  }

  type Order {
    id: ID!
    customerName: String!
    address: String!
    city: String!
    postalCode: String!
    items: [OrderItem!]!
    status: String!
  }

  type OrderItem {
    name: String!
    price: Float!
    quantity: Int!
    toppings: String
  }

  type Order {
    id: ID!
    message: String
  }

  type Product {
  id: ID!
  name: String!
  category: String!
  image: String!
  price: Float!
}

input ProductInput {
  name: String!
  category: String!
  image: String!
  price: Float!
}

  type Query {
    getUserByEmail(email: String!): User
    getOrders: [Order!]!
    getOrdersByUser(customerName: String!): [Order!]!
    products: [Product!]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!, role: String!): User
    login(email: String!, password: String!): User
    createOrder(input: OrderInput!): Order
    updateOrderStatus(id: ID!, status: String!): Order
    createProduct(input: ProductInput!): Product
  }
`;

// Connection to Mongodb using mongoose
// Reference: https://conestoga.desire2learn.com/d2l/le/content/1001970/viewContent/21346159/View 
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connected');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Here I define User schema using Mongoose Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Here I create User model
const User = mongoose.model('User', userSchema);

// Here I define resolvers for GraphQL operations
const resolvers = {
  Query: {
    // This resolver is for querying user by email
    getUserByEmail: async (_, { email }) => {
      try {
        const user = await User.findOne({ email });
        return user;
      } catch (error) {
        throw new Error(`Error retrieving user by email: ${error.message}`);
      }
    },
    // This resolver is for fetching the orders
    getOrders: async () => {
      try {
        // This below line is to fetch order fromt he database and set to the descending order
        const orders = await Order.find().sort({ _id: -1 });
        return orders;
      } catch (error) {
        throw new Error(`Error retrieving orders: ${error.message}`);
      }
    },
    // This is the function to get orders by customer name
    getOrdersByUser: async (_, { customerName }) => {
      try {
        // Here I fetch the order from the databse 
        const orders = await Order.find({ customerName }).sort({ _id: -1 });
        return orders;
      } catch (error) {
        throw new Error(`Error retrieving orders for user: ${error.message}`);
      }
    },
    // This function is to fetch all the products from the databse
    products: async () => {
      try {
        // Here I fetch the all the products from the databse
        const products = await Product.find();
        return products;
      } catch (error) {
        throw new Error(`Error retrieving products: ${error.message}`);
      }
    },
  },
  Mutation: {
    // This resolver is for user signup
    signup: async (_, { username, email, password, role }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists with this email');
        }
        const newUser = await User.create({ username, email, password, role });
        return newUser;
      } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    },
    // This resolver is for user login
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email, password });
        if (!user) {
          throw new Error('User not found or password incorrect');
        }
        return user;
      } catch (error) {
        throw new Error(`Error logging in: ${error.message}`);
      }
    },
    // This below mutation is for creating the new order 
    createOrder: async (_, { input }) => {
      try {
        const newOrder = new Order({
          ...input,
          status: 'Pending',
        });
        await newOrder.save();
        return {
          id: newOrder.id,
          message: 'Order created successfully',
        };
      } catch (error) {
        throw new Error(`Error creating order: ${error.message}`);
      }
    },
    // This below mutation is for upadting the status
    updateOrderStatus: async (_, { id, status }) => {
      try {
        // Below line is to fins the id and then update the status
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        return order;
      } catch (error) {
        throw new Error(`Error updating order status: ${error.message}`);
      }
    },
    // This beow mutaion is to create the product
    createProduct: async (_, { input }) => {
      try {
        // this line retrieves the last product ID and increment by 1 or start from 17
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const newProductId = lastProduct ? lastProduct.id + 1 : 17;

        // Here below code is create and save the product into databse
        const newProduct = await Product.create({
          id: newProductId,
          ...input,
        });

        return newProduct;
      } catch (error) {
        throw new Error(`Error creating product: ${error.message}`);
      }
    },
  },
};


// Below is the function to start ApolloServer with defined schema and resolvers
async function startServer() {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  
    await server.start();
  
    // Below line is to apply ApolloServer middleware to Express app
    server.applyMiddleware({ app });
  
    // Below code is to start the Express server
    app.listen({ port: process.env.PORT || 4000 }, () =>
      console.log(`Server running at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`)
    );
  }
  
  // Here I call the function to start the server
  startServer();