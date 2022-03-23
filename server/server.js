require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const jwt = require('jsonwebtoken');
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
const { db } = require('./config/connection');

const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const onlineUsers = require('./utils/onlineUsers');

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
app.use(routes);

io.use((socket, next) => {
  // verify JWT before allowing user to connect with socket
  if (socket.handshake?.query?.token) {
    jwt.verify(
      socket.handshake?.query?.token,
      process.env.SECRET,
      (err, decoded) => {
        if (err) {
          return next(new Error('Authentication error'));
        }
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error('Authentication error'));
  }
}).on('connection', (socket) => {
  const user = { ...socket.decoded.data, socket: socket.id };

  // check if user is already in onlineUsers array
  const index = onlineUsers.findIndex(
    (onlineUser) => onlineUser.username === user.username
  );

  // if not, push to array
  if (index === -1) {
    onlineUsers.push(user);
  } else {
    // otherwise, update that user's socket ID
    onlineUsers[index].socket = socket.id;
  }

  console.log(user.username, 'has connected.');

  socket.on('disconnect', () => {
    console.log(user.username, 'has disconnected');
  });
});

// serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  http.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Server running at http://localhost:${PORT}`);
    }
  });
});
