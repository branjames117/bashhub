const { Schema } = require('mongoose');
const dateFormat = require('../../client/src/utils/dateFormat');

const commentSchema = new Schema(
  {
    commentBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
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
