const { Schema, model } = require('mongoose');
//import functions from date-fns to format dates
const { format } = require('date-fns');
const { enAULocale } = require('date-fns/locale/en-AU');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true, //cant be 0 length
            maxlength: 280, //max length is 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //convert date to specified format
            // gives format - April 3rd, 2023 at 9:21 PM
            get: ((date) => format(date, "PPPp", { locale: enAULocale }))
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema], //array of reactios
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

// Create a virtual property `commentCount` that gets the amount of comments per user
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;