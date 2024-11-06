const mongoose = require('mongoose')
const conversation = require('./Conversation')

const messageSchema = mongoose.Schema({
    conversationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Conversation',
        require:true
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'User',
        require:true
    },
    content:{
        type:String,
        require:true
    }
},
{
    timestamps:true
}
);

const Message = mongoose.model('Message',messageSchema);
module.exports = Message;