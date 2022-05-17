// import mongoose from "mongoose"

// const UserSchema = new mongoose.Schema({

//     username: { type: String, unique: 'That username is already taken' }
// },
// {
//     password: { type: String }
// })

// export default mongoose.model('user', UserSchema);

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

export default mongoose.model('user', UserSchema);