// importing necessary components from mongoose
const { Schema, model } = require("mongoose");

// creating schema for user
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
      // mongoose validates email with this expression
      match: /\w+@\w+\.\w{2,6}/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// creating virtual for counting the number of friends that a user has
userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

//exporting User model
const User = model("User", userSchema);
module.exports = User;
