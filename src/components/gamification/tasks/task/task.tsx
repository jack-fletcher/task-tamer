'use client'

import React from "react";
import { DeleteTask, CompleteTask, EditTask } from "./actions";
import Modal from "@/components/general_use/modal";

export function Task(props:any) {

  function EditTaskHandler(formData:FormData)
  {
    EditTask(formData);
    handleClose();
  }

const [open, setOpen] = React.useState(false);

const handleClose = () => {
    setOpen(false);
};

const handleOpen = () => {
    setOpen(true);
};
  

    return (
      <div className="border m-5 w-96">
        <h1 className="w-full p-2 overflow-auto">{props.task_name}</h1>
        <div className="flex flex-col">
          <p className="w-full p-2 overflow-auto">{props.task_description}</p>
          <p className="p-2 text-right">{new Date(props.task_creation_date).toLocaleDateString()}</p>
        </div>
        <div className="flex flex-row justify-between p-2">
          <p className="cursor-pointer" onClick={handleOpen}>Edit</p>
          {/* <form action={EditTask}>
            <input className="w-full cursor-pointer" type="submit" value="Edit"/>
            <input type="hidden" id="taskId" name="taskId" value={props.task_id}/>
          </form> */}
          <form action={CompleteTask}>
            <input className="w-full cursor-pointer" type="submit" value="Complete"/>
            <input type="hidden" id="taskId" name="taskId" value={props.task_id}/>
          </form>
          <form action={DeleteTask}>
            <input className="w-full cursor-pointer" type="submit" value="Delete"/>
            <input type="hidden" id="taskId" name="taskId" value={props.task_id}/>
          </form>
        </div>
        <Modal isOpen={open} onClose={handleClose}>
        <div>
          <p className="text-center">New Task</p>
          <form action={EditTaskHandler}>
            <input className="m-1 w-full text-black" id="task-title" name="task-title" type="text" defaultValue={props.task_name}/>
            <input className="m-1 w-full text-black" id="task-description" name="task-description" type="text" defaultValue={props.task_description}/>
            <input className="border m-1 p-1 rounded-xl cursor-pointer" type="submit" value="Save"/>
            <input type="hidden" id="taskId" name="taskId" value={props.task_id}/>
          </form>
        </div>
      </Modal>
      </div>
    )
  }