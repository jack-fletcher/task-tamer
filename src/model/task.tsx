import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const taskSchema = new Schema({

  name: String,

  description: String,

  last_modified: Date,

  owner: Schema.Types.ObjectId,

  creation_date: Date,

  complete: Boolean,

});

const Task = mongoose.models.Task || model('Task', taskSchema);

export default Task;