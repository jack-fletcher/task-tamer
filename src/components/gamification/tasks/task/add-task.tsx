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
    <div className="flex flex-col">
      <button className="border rounded-xl w-10 h-10 m-5 text-2xl cursor-pointer hover:bg-fuchsia-600 self-center" onClick={(handleOpen)}><Image className="w-full h-full" src={add} alt="+"></Image></button>
      <Modal isOpen={open} onClose={handleClose}>
        <div className="h-full">
          <p className="text-xl text-center font-bold">New Task</p>
          <form className="h-full flex flex-col" action={SaveTaskHandler}>
            <input className="m-1 w-full text-black grow-0" id="task-title" name="task-title" type="text" placeholder="Task Name" required/>
            <textarea className="m-1 w-full resize-none grow text-black" id="task-description" name="task-description" placeholder="Task Description" required/>
            <input className="border m-1 p-1 rounded-xl cursor-pointer w-24 grow-0 hover:bg-fuchsia-600" type="submit" value="Add Task"/>
          </form>
        </div>
      </Modal>
    </div>
  )
}