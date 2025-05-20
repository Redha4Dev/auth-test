const Message = require('../Models/messagemodel');
const catchError = require('../utils/catchError');

exports.sendMessage = catchError(async (req, res, next) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;
    
  console.log(message);
  console.log(receiverId);
  console.log(senderId);

  
  // Create message
  const newMessage = await Message.create({
    sender: senderId,
    receiver: receiverId,
    message
  });


  res.status(201).json({
    status: 'success',
    
    message: newMessage,
  });
});

exports.getAllMessages = catchError(async (req,res,next) => {
        const userId = req.user._id;
        
        const messages = await Message.find({
          $or: [
            { sender: userId },
            { receiver: userId }
          ]
        })
        .sort({ createdAt: -1 })
        .populate('sender receiver', 'name email');
      
        res.status(200).json({
          status: 'success',
          messages
          
        });
      });
    