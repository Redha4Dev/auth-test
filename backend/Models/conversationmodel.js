const mongoose = require('mongoose');
const message = require('./chatmodel');
const User = require('./usermodel');

const conversationSchema = new mongoose.Schema({

    participant : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required: true

        }],

    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'message',
        }],
    
    
}, {timestamps : true}
);

const Conversation = mongoose.model("conversation" , conversationSchema);

module.exports = Conversation