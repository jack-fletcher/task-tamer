import React, { useEffect, useState } from "react";
import './navigation.css';
import { SignOut } from "../auth/signout-button";
import { SignIn } from "../auth/signin-button";
import { auth } from "@/auth";
import home from "../../app/assets/imgs/home.svg";
import award from "../../app/assets/imgs/award.svg";
import leaderboard from "../../app/assets/imgs/leaderboard.svg";
import Image from 'next/image'

function NavLink(props: any) {
  if (props.requiredState == props.currentState) {
    return (<a className="m-1 basis-2 text-center p-5" href={props.link}><Image className="w-full h-full m-3" src={props.img} alt={props.alt}></Image></a>);
  }
  return null;
}

export default async function Navigation() {
  const session = await auth()
  let loggedIn = false;
  if (session) {
    loggedIn = true;
  }
  return (
    <nav className="h-14 flex flex-row justify-between md:justify-end items-center bg-slate-300 dark:bg-slate-950">
      <div className="items-center mr-auto flex flex-row justify-end">
        <p className="text-2xl text-center font-bold p-2 text-nowrap">Task Tamer</p>
      </div>
      <NavLink link="/home" name="Home" img={home} alt="Home" requiredState={true} currentState={loggedIn} />
      <NavLink link="/badges" name="Badges" img={award} alt="Badges" requiredState={true} currentState={loggedIn} />
      <NavLink link="/leaderboard" name="Leaderboard" img={leaderboard} alt="Leaderboards" requiredState={true} currentState={loggedIn} />
      <SignIn className="m-1 basis-2 text-center p-5 " />
      <SignOut className="m-1 basis-2 text-center p-5 " />
    </nav>
  );
}
