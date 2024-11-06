'use client'

import { SaveTask } from "./actions"
//Derived from https://www.geeksforgeeks.org/how-to-use-modal-component-in-reactjs/
import React from "react";
import Modal from "@/components/general_use/modal";
import Image from 'next/image';
import add from "../../../../app/assets/imgs/add.svg";
export default function AddTask(props:any) {

function SaveTaskHandler(formData:FormData)
{
  SaveTask(formData);
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
    <div>
      <button className="border rounded-xl w-10 h-10 m-5 text-2xl cursor-pointer" onClick={(handleOpen)}><Image className="w-full h-full" src={add} alt="+"></Image></button>
      <Modal isOpen={open} onClose={handleClose}>
        <div>
          <p className="text-center">New Task</p>
          <form action={SaveTaskHandler}>
            <input className="m-1 w-full text-black" id="task-title" name="task-title" type="text" placeholder="Task Name" required/>
            <textarea className="m-1 w-full text-black" id="task-description" name="task-description" placeholder="Task Description"/>
            <input className="border m-1 p-1 rounded-xl cursor-pointer" type="submit" value="Add Task"/>
          </form>
        </div>
      </Modal>
    </div>
  )
}