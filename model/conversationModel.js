const mongoose = require('mongoose');
const User = require('./userModel');

const conversationSchema =new mongoose.Schema({
    members:[{
        type :mongoose.Schema.Types.ObjectId,
        ref:User,
        require:true
    }]
},
{
    timestamps:true
}
);

const Conversation = mongoose.model('Conversation',conversationSchema);
module.exports = Conversation;