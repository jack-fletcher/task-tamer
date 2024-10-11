import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation";
import { Task } from "./task/task";
 
export async function Tasks(props:any) {
  return (
    <div>
        <Task/>
        {/* Iterate through existing tasks */}
        {/* Allow user to add a task */}
    </div>
  )
}