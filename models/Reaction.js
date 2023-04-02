const { Schema, Types } = require('mongoose');
//import functions from date-fns to format dates
const { format } = require('date-fns');
const { enAULocale } = require('date-fns/locale/en-AU');
//const { formatDate } = require('../utils/helper.js');
//console.log(format(new Date(), "dd/MM/yyyy", { locale: en-AU }));
/*
function formatDate(date) {
    return format(date, "MMM do, yyyy hh:mm aaaa", { locale: enAULocale })
}
*/

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get: formatDate, //convert date to specified format
            get: ((date) => format(date, "PPPp", { locale: enAULocale }))
        },
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
)

// Initialize our Thought model
//const Reaction = model('reaction', reactionSchema);

module.exports = reactionSchema;
