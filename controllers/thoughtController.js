const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  //get all thoughts and return as JSON
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => {
          res.json(thoughts)
        })
        .catch((err) => res.status(500).json(err));
    },
    //get single thought by passing id in params to findOne
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },
    //create thought based on info from body
    //add to User based on id passed in body - userId
    //thoughts are associated with users
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } }, //add to array of thoughts as object
                { runValidators: true, new: true } //return new updated user
              )
        })
        .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the thought')
        )
        .catch((err) => res.status(500).json(err));
      },
      // Update a thought based on id passed in as parameter
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body }, //update thought from details in body
      { runValidators: true, new: true } //return new updated object
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete thought and also delete from User
  deleteThought(req, res) {
    //get thought based on id passed as parameter
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          //now find user and remove thought
          : User.findOneAndUpdate( 
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } }, //removes thought from array based on id
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'Thought deleted, but no users found with that thought',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //add reaction to thought
  addReaction(req, res) {
    //find thought based on id
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }, //add reaction to array - add all of body
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a thought
  removeReaction(req, res) {
    //remove reaction from thought, find thought first based on id
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } }, //remove from array
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID.' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};