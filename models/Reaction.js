const { Schema, Types } = require('mongoose');
//import functions from date-fns to format dates
const { format } = require('date-fns');
const { enAULocale } = require('date-fns/locale/en-AU');

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
            //convert date to specified format
            get: ((date) => format(date, "PPPp", { locale: enAULocale }))
        },
    },
    {
        toJSON: {
          getters: true, //ensure get (of date) is applied
        },
        id: false,
      }
)

module.exports = reactionSchema;
