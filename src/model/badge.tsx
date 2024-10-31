import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const badgeSchema = new Schema({

  name: String,

  image: String,

  description: String,

});

const Badge = mongoose.models.Badge || model('Badge', badgeSchema);

export default Badge;