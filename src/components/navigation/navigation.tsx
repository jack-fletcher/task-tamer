import React, {useEffect, useState} from "react";
import './navigation.css';
import Link from "next/link";

function NavLink(props:any){
  return <Link className="basis-2 text-center p-3" href={props.link}>{props.name}</Link>
}

export default function Navigation() {
    return (
      <nav className="flex flex-row justify-end bg-slate-300 dark:bg-slate-950">
            <img className="mr-auto basis-2 p-3" src="/src/app/favicon.ico"/>
            <NavLink link="/home" name="Home"/>
            <NavLink link="/logout" name="Logout"/>
      </nav>
    );
  }
  