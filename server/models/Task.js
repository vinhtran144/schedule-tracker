const mongoose = require('mongoose');
const {Schema} = mongoose;

// Task schema is for storing 2 types of task: 1. small, repeating task; 2. large, one-time goals
// Small tasks can be schedule daily in timeslots, each can contribute to a larger goal.
// Larger goals can be limited by deadlines, which can be shown on the scheduler.
// Each of the task will have their own To-Do list, which helps users break each task down even further

const TaskSchema = new Schema ({
    taskName:{
        type: String,
        required: true,
        trim: true
    },
    color:{
        // color of the tasks, frontend purposes
        type: String,
        default: '#ECECEC' // light grey
    },
    isBreak:{
        type: Boolean,
        default: false
    },
    urgency:{
        // N/A are meant for repeating small tasks that can be easily scheduled
        // while colored options are for larger goals that's hard to be scheduled. 
        // 'green' for the least urgent, 'yellow' for mildly urgent, and 'red' for extremely urgent
        type: String,
        enum: ['N/A','green','yellow','red'],
        default: 'N/A'
    },
    deadline:{
        // meant for larger goals. Epoch values
        type: Number
    },
    contributeTo: [ this ],
        // designed for an 'N/A' task to contribute to a goal with
        // 'green', 'yellow', or 'red' urgency
    
    toDo: [
        {
        // even smaller steps for a task, a list of To-do
        type: Schema.Types.ObjectId,
        ref: 'ToDo'
        }
    ],
    ownerID: [
        {
        // Can be use to query templates belong to a certain user
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ]   
});

const Task = mongoose.model('Task',TaskSchema);
module.exports = Task;