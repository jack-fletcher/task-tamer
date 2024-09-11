import React, {useEffect, useState} from "react";
import './navigation.css';
import Link from "next/link";

function Navigation_Link(props:any){
  return <Link href={props.link}>{props.name}</Link>
}

export default function Navigation() {
    return (
      <nav>
        <ul>
          <li>
            <Navigation_Link link="/Home" name="Home"/>
            <Navigation_Link link="/Logout" name="Logout"/>
          </li>
        </ul>
      </nav>
    );
  }
  