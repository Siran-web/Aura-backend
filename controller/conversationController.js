const mongoose = require('mongoose');
const Conversation = require('../modle/conversationModle');
const User = require('../modle/userModle');

exports.startConversation = async (req, res) => {
    try {
        const { members } = req.body; 

        const membersArray = members.map((id) => new mongoose.Types.ObjectId(id));

        const conversation = await Conversation.findOne({
            members: { $all: membersArray },
            $expr: { $eq: [{ $size: "$members" }, membersArray.length] }
        });

        if (conversation) {
            console.log("Conversation already exists:", conversation);
            return res.status(200).json({ message: "Conversation already exists.", conversation });
        }

        const newConversation = new Conversation({
            members: membersArray
        });

        await newConversation.save();
        console.log("New conversation created:", newConversation);
        res.status(201).json(newConversation);
    } catch (error) {
        console.error("Error in startConversation:", error);
        res.status(500).json({ error: 'Failed to create conversation.' });
    }
};

exports.getUserConversations = async (req, res) => {
    try {
        const conversationId = req.params.conversationId;

        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found.' });
        }

        res.status(200).json({ members: conversation.members });

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversations.' });
    }
};

