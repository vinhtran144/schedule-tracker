const mongoose = require('mongoose');
const {Schema} = mongoose;

const ToDoSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    checked:{
        type: Boolean,
        default: false,
        timestamps: true
    },
    repeating:{
        // for undo checked content.
        type: String,
        enum: ['None','Daily','Weekly','Monthly'],
        default: 'None'
    },
    nextUndo:{
        // epoch value, set by frontend.
        type: Number
    }
})


const ToDo = mongoose.model('ToDo',ToDoSchema);
module.exports = ToDo;