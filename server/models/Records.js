const mongoose = require('mongoose');
const {Schema} = mongoose;

const EntrySchema = new Schema ({
    offset: {
        // milliseconds offset from midnight of the day. 
        // meant to be added to Epoch time in an application
        type: Number,
        required: true
    },
    taskID: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    duration: {
        // duration of a task in milliseconds
        type: Number,
        required: true
    },
    breakDuration: {
        // millisecond for break after concentration period
        // duration above should include this value
        type: Number
    }
});

const RecordSchema = new Schema ({
    // Designed to be queried by date and user ID
    date: {
        // Epoch value, for consistency, this value is created by
        // Date.UTC(year, monthIndex, day)
        type: Number,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    EntryRecords: [
        {
            type: EntrySchema
            // meant to be added with every new entry
        }
    ]
});

const Records = mongoose.model('Records',RecordSchema);
module.exports = Records;