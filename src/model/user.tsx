import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({

  name: String,

  email: String,

  last_login: Date,

  consecutive_login: Number,

  experience: Number,

  badges_completed: [{
    badge_id: String,
    completion_date: Date,
  }],

});

const User = mongoose.models.User || model('User', userSchema);

export default User;