import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatroom: { 
        type: String, 
        required: true,  
    },
    author: { 
      type: String, required: true 
    }

});

export default mongoose.model("Message", messageSchema);