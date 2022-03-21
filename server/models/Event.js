const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 64,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      maxlength: 64,
    },
    location: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    eventType: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
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
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    url: {
      type: String,
      maxlength: 128,
    },
    ticketsUrl: {
      type: String,
      maxlength: 128,
    },
    pricing: {
      type: String,
      maxlength: 64,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    description: {
      type: String,
      maxlength: 512,
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
    publicEnabled: {
      type: Boolean,
      default: true,
    },
    comments: [commentSchema],
    // null unless subevent
    eventParent: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    subevents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    videoUrl: {
      type: String,
      maxlength: 128,
    },
  },
  {
    timestamps: true,
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
