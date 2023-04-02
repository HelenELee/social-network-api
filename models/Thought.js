const { Schema, model } = require('mongoose');
//import functions from date-fns to format dates
const { format } = require('date-fns');
const { enAULocale } = require('date-fns/locale/en-AU');
const reactionSchema = require('./Reaction');

/*
//console.log(format(new Date(), "dd/MM/yyyy", { locale: en-AU }));
function formatDate(date) {
  //MMM do, yyyy hh:mm aaaa
  //dd/MM/yyyy
    return format(date, "dd/MM/yyyyMMM do, yyyy hh:mm aaaa", { locale: enAULocale })
}*/

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
            //get: formatDate, //convert date to specified format
            // PPPp
            //"MMM do, yyyy hh:mm aaaa"
            get: ((date) => format(date, "PPPp", { locale: enAULocale }))
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
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
    //return `${this.reactions.lenght}`;
  })

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;