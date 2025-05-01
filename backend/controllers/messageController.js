// const Conversation = require('../Models/conversationmodel');
// const catchError = require ('../utils/catchError');





// exports.sendMessage = catchError(async(req,res,next) =>{
    
//     console.log('message sent to ' , req.params.id);
    
//     const message = req.body.message;
//     const {id:receiverId} = req.params;
//     const senderId = req.user._id;
    
//     console.log('message : ' ,message)
//     console.log('receiver : ' ,receiverId)
//     console.log('sender : ' ,senderId)
//     let conversation = await Conversation.findOne({
//         participant : { $all : [senderId , receiverId] }
//     })
//     if (!conversation) {
//         converstaion =  Conversation.create({
//         participant : [senderId , receiverId], 
//         messages : [{sender : senderId, message}] 
//         })


//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             message
//         });


//     if (newMessage){
//         conversation.messages.push(newMessage._id);
//     }

//     await Promise.all([conversation.save() ,newMessage.save() ]);
//     res.status(201).json({message : "Message sent successfully", newMessage })

//     }


// }) 