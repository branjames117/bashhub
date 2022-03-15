require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
const cors = require('cors');
const path = require('path');

const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  // start the Apollo server
  await server.start();

  // integrate our Apollo server with the Express app as middleware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('User connected.');

  socket.on('disconnect', () => {
    console.log('User has disconnected');
  });
});

// serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// deliver built index.html when deployed
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
  http.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Server running at http://localhost:${PORT}`);
    }
  });
});
