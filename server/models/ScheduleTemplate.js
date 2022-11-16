const mongoose = require('mongoose');
const {Schema} = mongoose;

const TimeslotSchema = new Schema ({
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
    duration:{
        // duration of a task in milliseconds
        type: Number,
        required: true
    }
})

const ScheduleTemplateSchema = new Schema ({
    // Template for a user's day. Meant to have tasks scheduled in its own timeslot in a day
    // Can be designed to reuse throughout days within a week
    templateName: {
        // friendly name to help identify template
        type: String,
        required: true,
        trim: true
    },
    ownerID: [
        {
            // Can be use to query templates belong to a certain user
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    timeslots: [
        {
            // Array of Timeslot within a day
            type: TimeslotSchema
        }
    ]
});


const ScheduleTemplate = mongoose.model('ScheduleTemplate',ScheduleTemplateSchema);
module.exports = ScheduleTemplate;