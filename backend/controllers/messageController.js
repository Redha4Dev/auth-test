const Message = require('../Models/messagemodel');
const catchError = require('../utils/catchError');
const AppError = require('../utils/apperror');
const User = require('../Models/usermodel')




exports.sendMessage = catchError(async (req, res, next) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.body.id;
  
  const newMessage = await Message.create({
    sender: senderId,
    receiver: receiverId,
    message
  });


  res.status(201).send({
    status: 'success',
    
    message: newMessage,
  });
});

exports.getAllMessages = catchError(async (req,res,next) => {
  
  
  const userId = req.params.id;
        
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

    


exports.getMessageDetails = catchError(async (req, res, next) => {
    const { id } = req.params;     
  
    const message = await Message.findById(id)
  
    if (!message) {
      return next(new AppError('Message not found', 404));
    }

    const user = await User.findById(message.sender._id)

    if (!user) {
        return next(new AppError('User not found', 404))
      }

    res.status(200).send({
      status: 'success',
      senderId: message.sender._id,
      senderName: message.sender.name,
      message: message.message,
      name : user.name
    })

})



exports.deleteMessage = catchError(async (req, res, next) => {
  const { id } = req.params;

  const message = await Message.findById(id);
  if (!message) {
    return next(new AppError('Message not found', 404));
  }
  
  await Message.findByIdAndDelete(id);
  res.status(204).send({ status: 'success' });
});