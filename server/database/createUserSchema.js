import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
    },
    password: { 
      type: String, 
      required: true 
    },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default:
        "https://res.cloudinary.com/drkyd0zuy/image/upload/v1629902679/avatar/blank_avatar_eqtraf.png",
    },
});

export default mongoose.model("User", userSchema);