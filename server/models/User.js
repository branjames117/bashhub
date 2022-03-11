const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    comments: [commentSchema],
    bio: {
      type: String,
      trim: true,
    },
    eventsManaged: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    eventsInterested: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    eventsAttending: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    avatar: {
      type: String,
      trim: true,
    },
    avatarId: {
      type: String,
      trim: true,
    },
    resetToken: {
      type: String,
      trim: true,
      default: null,
    },
    resetExp: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('eventsCount').get(function () {
  return this.events_attending.length;
});

const User = model('User', userSchema);

module.exports = User;
