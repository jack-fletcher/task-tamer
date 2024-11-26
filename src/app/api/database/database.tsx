import { ObjectId } from "mongodb";
import mongoose from 'mongoose';
import Task from '@/model/task';
import User from '@/model/user';
import Badge from "@/model/badge";
import generateRandomUsername from 'generate-random-username';

//https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/#finding-data

 const uri = process.env.MONGODB_URI;
 mongoose.connect(uri!);

const { MongoClient, ServerApiVersion } = require('mongodb');
var sanitize = require('mongo-sanitize');
//Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function create_new_user(user_name:string, user_email:string)
{
    user_name = sanitize(user_name);
    user_email = sanitize(user_email);
    const existing_user = await User.findOne({ name: user_name, email: user_email});
    //If we already have a user, don't make another.
    if(existing_user)
    {
        return;
    }
    const user = new User({
        name: generateRandomUsername(),

        email: user_email,
      
        last_login: new Date(),
      
        experience: 0,
      
        badges_completed: new Array(),
    });
    await user.save();
}

export async function get_all_badge_data()
{
    const badge_data_mongoose = await Badge.find({}).exec();
    return(badge_data_mongoose);
}

export async function get_user_id_from_session_email(user_email:string)
{
    user_email = sanitize(user_email);
    const user_id = await User.findOne({email: user_email}, "_id").exec();
    return(user_id._id);
}

export async function get_user_badge_data_from_id(user_id:ObjectId)
{
    const user_data = await User.findById(user_id, "badges_completed").exec();
    return(user_data.badges_completed);
}

export async function save_task_to_user_profile(user_id:ObjectId, task_name:string, task_description:string)
{
    task_name = sanitize(task_name);
    task_description = sanitize(task_description);
    const task = new Task({
        name: task_name,

        description: task_description,
      
        last_modified: new Date(),
      
        owner: user_id,
      
        creation_date: new Date(),
      
        complete: false,
    });
    await task.save();
}

export async function get_incomplete_user_tasks_from_id(user_id:ObjectId)
{
    const incomplete_tasks = Task.find({owner: user_id, complete: false}).exec();
    return(incomplete_tasks);
}

export async function get_complete_user_tasks_from_id(user_id:ObjectId)
{
    const complete_tasks = Task.find({owner: user_id, complete: true}).exec();
    return(complete_tasks);
}

export async function delete_user_task_from_id(task_id:ObjectId, user_id:ObjectId)
{
    await Task.deleteOne({_id:task_id, owner: user_id})
}

export async function complete_user_task_from_id(task_id:ObjectId, user_id:ObjectId)
{
    const task = await Task.findOne({_id:task_id, owner: user_id}).exec();
    task.complete = true;
    task.save();
}

export async function edit_user_task_from_id(task_id:ObjectId, user_id:ObjectId, task_name:String, task_description:String)
{
    task_name = sanitize(task_name);
    task_description = sanitize(task_description);
    const task = await Task.findOne({_id:task_id, owner: user_id}).exec();
    task.name = task_name;
    task.description = task_description;
    task.save();
}

export async function give_user_experience(user_id:ObjectId, delta:number)
{
    const user = await User.findById(user_id).exec();
    user.experience = user.experience + delta;
    user.save();
}

export async function get_user_experience_from_id(user_id:ObjectId)
{
    const experience = await User.findById(user_id, "experience").exec();
    return(experience);
}

export async function get_user_leaderboard_data()
{
    const user_list = await User.find({}, "name experience").exec();
    return(user_list);
}

export async function get_user_experience(user_id:ObjectId)
{
    const user_data = await User.findById({_id:user_id}, "experience").exec();
    return(user_data.experience);
}

export async function get_user_name(user_id:ObjectId)
{
    const user_data = await User.findById({_id:user_id}, "name").exec();
    return(user_data.name);
}

export async function get_user_task_completed_count(user_id:ObjectId)
{
    const user_data = await Task.find({owner:user_id}).exec();
    return(user_data.length);
}

export async function get_user_badge_completed(user_id:ObjectId, badge_id:ObjectId)
{
    const user_data = await User.findById({_id:user_id}, "badges_completed").exec();
    //Now we have their user id, lets search for whether they've completed the badge.
    const user_completed_badge = (badge:any) => badge.badge_id==badge_id;
    return(user_data.badges_completed.some(user_completed_badge));
}

export async function set_user_badge_completed(user_id:ObjectId, badge_id:ObjectId)
{
    const user_data = await User.findById({_id:user_id}, "badges_completed").exec();
    let completed_badge = { badge_id: badge_id, completion_date: new Date() }
    user_data.badges_completed.push(completed_badge)
    user_data.save();
}