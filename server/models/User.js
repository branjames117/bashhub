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
    location: {
      type: String,
      trim: true,
    },
    birthday: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      default: '',
    },
    eventsManaged: [
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
    timestamps: true,
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

userSchema.virtual('age').get(function () {
  if (!this.birthday) {
    return null;
  }

  let dob = new Date(this.birthday);
  let month_diff = Date.now() - dob.getTime();
  let age_dt = new Date(month_diff);
  let year = age_dt.getUTCFullYear();
  return Math.abs(year - 1970);
});

const User = model('User', userSchema);

module.exports = User;
