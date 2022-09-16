const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
  title: { type: String, required: true, nullable: false },
  notes: { type: String },
  start: { type: Date, required: true, nullable: false },
  end: { type: Date, required: true, nullable: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    nullable: false,
  },
});

EventSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Event', EventSchema);
