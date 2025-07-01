import { Conversation } from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
    try{
const senderId = req.id;
const receiverId = req.params.id;
const {message} = req.body;

let conversation = await Conversation.findOne({
    participants:{$all : {senderId, receiverId}}
});

//if not the established convo btn them
if(!conversation){
    conversation = await Conversation.create({
        participants:[senderId, receiverId]
    })
};

const newMessage = await Message.create({
    senderId, receiverId, message
});

if(newMessage) conversation.messages.push(newMessage._id);
await Promise.all([conversation.save(), newMessage.save()]);

return res.status(201).json({
    success:true, newMessage
})

    }catch(err){
        console.log(err)
    }
}


export const getMessage = async (req, res) => {
    try{
const senderId = req.id;
const receiverId = req.params.id;

let conversation = await Conversation.findOne({
    participants:{$all : {senderId, receiverId}}
});

//if not the established convo btn them
if(!conversation){
return res.status(200).json({
    success:true, message:[]
})
}
return res.status(201).json({
    success:true, newMessage:conversation?.message
})


if(newMessage) conversation.messages.push(newMessage._id);
await Promise.all([conversation.save(), newMessage.save()]);

return res.status(201).json({
    success:true, newMessage
})

    }catch(err){
        console.log(err)
    }
}