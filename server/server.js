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

  socket.on('newComment', ({ from, to }) => {
    console.log(
      `A new comment was created by ${from}. Notify ${to} immediately!`
    );
    // check if TO:user is online
    const index = onlineUsers.findIndex(
      (onlineUser) => onlineUser.username === to
    );

    if (index !== -1) {
      // to do - create a new notification for the user in the DB, this happens regardless of whether the user is online
      // if the user IS online, send a signal to them that they have a new notification
      // to do - add a notifications field to the user
      // Notification schema needs an _id, event_name, event_slug, createdAt, author, and a read status: 'Author commented on EventName (link: eventslug) at 12 March 2022 at 10:00 PM.'
      // when user visits their Notifications page, it updates all current Notifications in their array to read = true
      // A user has a getter to get their current notificationsCount which gets the count of all their unread notifications, so that when the user first logs on, we can get their latest notification count
    }
  });

  socket.on('disconnect', () => {
    // find the user's current index
    const index = onlineUsers.findIndex(
      (onlineUser) => onlineUser.socket === user.socket
    );
    if (index !== -1) {
      onlineUsers.splice(index, index >= 0 ? 1 : 0);
    }
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
