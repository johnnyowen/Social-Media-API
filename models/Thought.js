// importing necessary components from mongoose
const { Schema, model } = require("mongoose");

// creating the reaction schema first because it is referenced in the thought schema
const reactionSchema = new Schema(
  {
    reactionId: {
      default: Schema.Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// creating the thought schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// sets up a virtual variable that is used to count the number of reactions attached to a thought
thoughtSchema.virtual("reactionCount").get(function () {
  return `${this.reactions.length}`;
});

// exporting the Thought model
const Thought = model("Thought", thoughtSchema);
module.exports = Thought;
