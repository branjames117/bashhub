const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      maxlength: 128,
    },
    location: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 128,
    },
    eventType: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      get: (timestamp) => dateFormat(timestamp),
    },
    endDate: {
      type: Date,
      get: (timestamp) => dateFormat(timestamp),
    },
    startTime: {
      type: Number,
    },
    endTime: {
      type: Number,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    ownerName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    ticketsUrl: {
      type: String,
    },
    pricing: {
      type: String,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    description: {
      type: String,
    },
    hero: {
      type: String,
    },
    heroId: {
      type: String,
    },
    commentsEnabled: {
      type: Boolean,
      default: true,
    },
    comments: [commentSchema],
    // null unless subevent
    eventParent: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: 'Event',
    },
    videosEnabled: {
      type: Boolean,
      default: false,
    },
    videoUrls: [
      {
        type: String,
      },
    ],
    videoTerm: {
      type: String,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

eventSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Event = model('Event', eventSchema);

module.exports = Event;
