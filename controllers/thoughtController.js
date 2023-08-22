// importing the Thought model to set up functions to manipulate the database
const { Thought } = require("../models");

// exporting all the functions right away
module.exports = {
  // gets all thoughts that exist in the database, GET request
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // finding a single thought by id, GET request
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
        // excludes the version key added by mongoose
      }).select("-__v");
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // function to create a new thought, POST request
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // function to delete a thought by id, DELETE request
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json({ message: "Thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // function to update a thought by id, PUT request
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // function to add a reaction to a thought, POST request
  async addReaction(req, res) {
    try {
      // takes a thought id to add a reaction to the array of reactions
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!reaction) {
        res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json({ message: "Reaction added!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // function to delete a reaction, DELETE request
  async deleteReaction(req, res) {
    try {
      // takes a thought id and a reaction id to delete a reaction from the array of reactions
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!reaction) {
        res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json({ message: "Reaction deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
