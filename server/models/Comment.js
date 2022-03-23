const { Schema } = require('mongoose');

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 512,
    },
    event_slug: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
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

module.exports = commentSchema;
