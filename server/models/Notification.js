const { Schema, model } = require('mongoose');

const notificationSchema = new Schema(
  {
    fromId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    toId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    subject: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Event',
    },
    notifType: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
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

const Notification = model('Notification', notificationSchema);

module.exports = Notification;
