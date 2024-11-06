import React, {useEffect, useState} from "react";
import './navigation.css';
import Link from "next/link";
import Image from "next/image";
import logo from "../../app/assets/imgs/logo_transparent_120px.png";
import { SignOut } from "../auth/signout-button";
import GetSession from "../auth/getSession";
import { SignIn } from "../auth/signin-button";
import { auth } from "@/auth";

function NavLink(props:any){
  if(props.requiredState==props.currentState)
  {
    return <Link className="m-1 basis-2 text-center p-5" href={props.link}>{props.name}</Link>
  }
  return null;
}

export default async function Navigation() {
  const session = await auth()
  let loggedIn=false;
  if(session)
  {
    loggedIn=true;
  }
    return (
      <nav className="h-14 flex flex-row justify-end items-center bg-slate-300 dark:bg-slate-950">
          {/* <div className="items-center mr-auto flex flex-row justify-end">
            <p className="text-2xl text-center p-1 text-nowrap">Task Tamer</p>
          </div> */}
            <NavLink link="/home" name="Home" requiredState={true} currentState={loggedIn}/>
            <NavLink link="/badges" name="Badges" requiredState={true} currentState={loggedIn}/>
            <NavLink link="/leaderboard" name="Leaderboard" requiredState={true} currentState={loggedIn}/>
            <SignIn className="m-1 basis-2 text-center p-5"/>
            <SignOut className="m-1 basis-2 text-center p-5"/>
      </nav>
    );
  }
  