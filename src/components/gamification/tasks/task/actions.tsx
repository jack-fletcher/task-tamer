'use server'

import { complete_user_task_from_id, delete_user_task_from_id, edit_user_task_from_id, get_user_badge_completed, get_user_task_completed_count, get_user_id_from_session_email, give_user_experience, save_task_to_user_profile, set_user_badge_completed } from "@/app/api/database/database";
import { auth } from "@/auth";
import { useRouter } from "next/navigation";
import { revalidatePath } from 'next/cache'

import { ObjectId } from 'mongodb';

export async function SaveTask(formData: FormData) {
    const task_title = formData.get("task-title")?.toString();
    const task_description = formData.get("task-description")?.toString();
    if (task_title == null || task_description == null) return;
    const session = await auth()
    if (!session) return null;
    let user_id = null;
    if (session.user?.email) user_id = await get_user_id_from_session_email(session.user.email);
    save_task_to_user_profile(user_id, task_title, task_description)
    revalidatePath('/home');
}

export async function CompleteTask(formData: FormData) {
    const object_id = new ObjectId(formData.get("taskId")?.toString() || "");
    const session = await auth()
    if (!session) return null;
    let user_id = null;
    if (session.user?.email) user_id = await get_user_id_from_session_email(session.user.email);
    complete_user_task_from_id(object_id, user_id);
    //Now we've completed a task, lets assign the user some XP.
    give_user_experience(user_id, 10);
    //We should also see whether they've unlocked any additional badges.
    CheckForNewTaskCompletionBadge(user_id);
    revalidatePath('/home');
}

//TODO: Edit
export async function EditTask(formData: FormData) {
    const task_title = formData.get("task-title")?.toString();
    const task_description = formData.get("task-description")?.toString();
    if (task_title == null || task_description == null) return;
    const object_id = new ObjectId(formData.get("taskId")?.toString() || "");
    const session = await auth()
    if (!session) return null;
    let user_id = null;
    if (session.user?.email) user_id = await get_user_id_from_session_email(session.user.email);
    edit_user_task_from_id(object_id, user_id, task_title, task_description);
    revalidatePath('/home');
}

export async function DeleteTask(formData: FormData) {
    const object_id = new ObjectId(formData.get("taskId")?.toString() || "");
    const session = await auth()
    if (!session) return null;
    let user_id = null;
    if (session.user?.email) user_id = await get_user_id_from_session_email(session.user.email);
    delete_user_task_from_id(object_id, user_id);
    revalidatePath('/home');
}

async function CheckForNewTaskCompletionBadge(user_id: ObjectId) {
    CheckForTaskCountBadges(user_id);
    CheckForTaskTimeCompletionBadges(user_id);
}

async function CheckForTaskCountBadges(user_id: ObjectId) {
    CheckForTaskCountBadge(user_id, new ObjectId("6708407b309e4247c7e9c525"), 1);
    CheckForTaskCountBadge(user_id, new ObjectId("67084144309e4247c7e9c526"), 2);
    CheckForTaskCountBadge(user_id, new ObjectId("6708415d309e4247c7e9c527"), 3);
}

async function CheckForTaskCountBadge(user_id: ObjectId, badge_id: ObjectId, required_count: number) {
    let task_completed = await get_user_badge_completed(user_id, badge_id);
    if (task_completed == true) {
        return;
    }
    let task_complete_count = await get_user_task_completed_count(user_id);
    if (task_complete_count >= required_count) {
        set_user_badge_completed(user_id, badge_id);
    }
}

function CheckForTaskTimeCompletionBadges(user_id: ObjectId) {
    let time_completed = GetTaskCompletionTime();
    //If they complete a task between 10pm-3am - unlock night owl.
    if (time_completed >= 22 || time_completed <= 3) {
        set_user_badge_completed(user_id, new ObjectId("67084182309e4247c7e9c529"));
    }
    //If they complete a task between 5am-9am - unlock early riser.
    if (time_completed >= 5 && time_completed <= 9) {

    }
}

function GetTaskCompletionTime() {
    return (new Date().getHours());
}