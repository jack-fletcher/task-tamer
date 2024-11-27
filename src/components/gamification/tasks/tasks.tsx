import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation";
import { Task } from "./task/task";
import AddTask from "./task/add-task";
import { get_user_id_from_session_email, get_incomplete_user_tasks_from_id } from "@/app/api/database/database";
import { ObjectId } from "mongodb";

export async function Tasks(props: any) {
  const session = await auth()
  if (!session) return null;
  let user_id = null;
  if (session.user?.email) user_id = await get_user_id_from_session_email(session.user.email);
  const task_data = await get_incomplete_user_tasks_from_id(user_id);

  return (
    <div className="bg-slate-300 dark:bg-slate-950 rounded-xl m-5">
      <h1 className="text-xl m-5 p-2 font-bold">Your Tasks</h1>
      <div className="flex flex-row m-5 flex-wrap">
        {task_data.map((task: any) =>
          <Task key={task._id} task_id={task._id.toString()} task_name={task.name} task_description={task.description} task_creation_date={task.creation_date} />
        )}
      </div>
      <AddTask />
    </div>
  )
}