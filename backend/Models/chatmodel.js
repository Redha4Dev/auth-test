const  mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({

    senderId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref :'User',
        required :'true'
    }],

    receiverId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref :'User',
        required :'true'
    }],

    message : {
        type: String,
        required: true,
        maxlength: 1000,
        trim: true,
        validate: {
            validator: (value) => value.trim().length > 0,
            message: "Message cannot be empty"
        }
    },
    createAt : {type : Date , default : Date.now},
    read: {
        type: Boolean,
        default: false
    },
});

const Message = mongoose.model('Message ', messageSchema);

module.exports = Message;   

