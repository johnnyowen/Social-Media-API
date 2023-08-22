// importing User and Thought to manipulate the database 
const { User, Thought } = require("../models");

// exporting right off the bat
module.exports = {
  // returns all users in the database, GET request
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // returns a single user by id, GET request
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id }).select("-__v");
      if (!user) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // creates a new user, POST request
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // deletes a single user by id, DELETE request
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      // logic to delete thoughts, but I dont think it'll work because thoughts have a username field but are not tied to a username or id
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({
        message: "User and associated thoughts deleted successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // updates a single user by id, PUT request
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // adds a friend to a user, POST request
  async addFriend(req, res) {
    try {
      // uses 2 users unique ids to add one user to another users friend array
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      res.json({ message: "Friend added successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // removes a friend from a user, DELETE request
  async deleteFriend(req, res) {
    try {
      // uses 2 users unique ids to remove one user from another users friend array
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      res.json({ message: "Friend deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
