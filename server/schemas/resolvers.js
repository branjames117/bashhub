const { AuthenticationError } = require('apollo-server-express');
const { default: mongoose } = require('mongoose');
const { User, Event, Tag } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      const userData = await User.find()
        .select('-__v -password')
        .populate('eventsManaged')
        .populate('eventsAttending');

      return userData;
    },
    user: async (parent, { username }) => {
      const userData = await User.findOne({ username })
        .select('-__v -password')
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
        .populate('ownerId')
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            model: 'User',
            select: ['avatar', 'username'],
          },
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
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { bio }
        ).select('-__v -password');

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    addEvent: async (parent, { eventInput }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      console.log('made it');

      try {
        // check if event slug already exists in db, in which case, this is an event edit and not an event creation
        const eventExists = await Event.findOne({
          slug: eventInput.slug,
        }).select('_id');

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

        let event;
        if (eventExists) {
          // if event already exists, just update it
          event = await Event.findByIdAndUpdate(eventExists._id, eventInput, {
            new: true,
          })
            .populate('eventParent')
            .populate('tags')
            .populate('ownerId')
            .populate('subevents');

          return event;
        } else {
          // then create the event itself using an array of the updated tag IDs
          event = await Event.create(eventInput);

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

          const returnedEvent = await Event.findById(event._id)
            .populate('eventParent')
            .populate('tags')
            .populate('ownerId')
            .populate('subevents');

          return returnedEvent;
        }
      } catch (err) {
        console.log(err);
        throw new Error('Event not created');
      }
    },
    addAttendee: async (parent, { event_id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

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
        const returnedUser = await User.findById(context.user._id)
          .select('-__v -password')
          .populate('eventsAttending');

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
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const eventId = mongoose.Types.ObjectId(event_id);

        // user found, so let's take them out instead
        await User.findByIdAndUpdate(context.user._id, {
          $pull: { eventsAttending: eventId },
        });
        // then update the event
        await Event.findByIdAndUpdate(eventId, {
          $pull: { attendees: context.user._id },
        });

        // then find and populate them both for return
        const returnedUser = await User.findById(context.user._id)
          .select('-__v -password')
          .populate('eventsAttending');

        const returnedEvent = await Event.findById(eventId).populate(
          'attendees'
        );

        return { user: returnedUser, event: returnedEvent };
      } catch (err) {
        console.log(err);
        throw new Error('User and event not updated');
      }
    },
    addComment: async (parent, { event_slug, body }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      // update event
      return await Event.findOneAndUpdate(
        { slug: event_slug },
        {
          $push: {
            comments: {
              body,
              author: context.user._id,
              event_slug,
            },
          },
        },
        { new: true, runValidators: true }
      ).populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
          select: ['avatar', 'username'],
        },
      });
    },
    removeComment: async (parent, { event_slug, _id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      // update event
      return await Event.findOneAndUpdate(
        { slug: event_slug },
        {
          $pull: {
            comments: {
              _id,
            },
          },
        },
        { new: true, runValidators: true }
      ).populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
          select: ['avatar', 'username'],
        },
      });
    },
  },
};

module.exports = resolvers;
