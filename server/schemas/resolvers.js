const { AuthenticationError } = require('apollo-server-express');
const { default: mongoose } = require('mongoose');
const { User, Event, Tag } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      const userData = await User.find()
        .select('-__v -password')
        .populate('comments')
        .populate('eventsManaged')
        .populate('eventsAttending');

      return userData;
    },
    user: async (parent, { username }) => {
      const userData = await User.findOne({ username })
        .select('-__v -password')
        .populate('comments')
        .populate('eventsManaged')
        .populate('eventsAttending');

      // filter out events with parents
      userData.eventsManaged = userData.eventsManaged.filter(
        (event) => !event.eventParent
      );

      return userData;
    },
    event: async (parent, { slug }) => {
      const eventData = await Event.findOne({
        slug,
      })
        .populate('tags')
        .populate('eventParent')
        .populate('subevents')
        .populate('attendees');

      return eventData;
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('comments')
          .populate('eventsManaged')
          .populate('eventsAttending');

        // filter out any events that have parents (are subevents)
        userData.eventsManaged = userData.eventsManaged.filter(
          (event) => !event.eventParent
        );

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    slug: async (parent, { slug }) => {
      const event = Event.findOne({ slug }).select('slug');

      return event;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    editBio: async (parent, { bio }, context) => {
      if (context.user) {
        console.log(context.user);
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { bio }
        );

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    addEvent: async (parent, { eventInput }, context) => {
      try {
        // create the tags in the database first, if they don't already exist
        tagsIdArr = [];

        for (tag of eventInput.tags) {
          const newTag = await Tag.findOneAndUpdate(
            { name: tag },
            { name: tag },
            { upsert: true, returnDocument: 'after' }
          );

          tagsIdArr.push(newTag._id);
        }

        eventInput.tags = tagsIdArr;

        // then create the event itself using an array of the updated tag IDs
        const event = await Event.create(eventInput);

        // then, if the event is a child of another event, add its id to the subevents field of the parent
        if (event.eventParent) {
          await Event.findByIdAndUpdate(event.eventParent, {
            $push: { subevents: event._id },
          });
        }

        // then add the created events ID to the user's eventsManaged array
        await User.findByIdAndUpdate(context.user._id, {
          $push: { eventsManaged: event._id },
        });

        const returnedEvent = await Event.findById(event._id).populate(
          'eventParent'
        );

        console.log(returnedEvent);

        return returnedEvent;
      } catch (err) {
        console.log(err);
        throw new Error('Event not created');
      }
    },
    addAttendee: async (parent, { event_id }, context) => {
      try {
        const eventId = mongoose.Types.ObjectId(event_id);

        await User.findByIdAndUpdate(context.user._id, {
          $push: { eventsAttending: eventId },
        });
        // then update the event
        await Event.findByIdAndUpdate(eventId, {
          $push: { attendees: context.user._id },
        });

        // then find and populate them both for return
        const returnedUser = await User.findById(context.user._id).populate(
          'eventsAttending'
        );

        const returnedEvent = await Event.findById(eventId).populate(
          'attendees'
        );

        return { user: returnedUser, event: returnedEvent };
      } catch (err) {
        console.log(err);
        throw new Error('User and event not updated');
      }
    },
    removeAttendee: async (parent, { event_id }, context) => {
      try {
        const eventId = mongoose.Types.ObjectId(event_id);

        // first find if the user is already attending this event
        const user = await User.findOne({
          _id: context.user._id,
          eventsAttending: eventId,
        });

        // user found, so let's take them out instead
        await User.findByIdAndUpdate(context.user._id, {
          $pull: { eventsAttending: eventId },
        });
        // then update the event
        await Event.findByIdAndUpdate(eventId, {
          $pull: { attendees: context.user._id },
        });

        // then find and populate them both for return
        const returnedUser = await User.findById(context.user._id).populate(
          'eventsAttending'
        );

        const returnedEvent = await Event.findById(eventId).populate(
          'attendees'
        );

        return { user: returnedUser, event: returnedEvent };
      } catch (err) {
        console.log(err);
        throw new Error('User and event not updated');
      }
    },
  },
};

module.exports = resolvers;
