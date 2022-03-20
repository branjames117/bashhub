const { Schema, model } = require('mongoose');

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 16,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Tag = model('Tag', tagSchema);

module.exports = Tag;
