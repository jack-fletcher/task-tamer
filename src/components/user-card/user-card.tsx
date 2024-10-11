import { auth } from "@/auth";
import Image from "next/image";
import { UserAvatar } from "../user-avatar/user-avatar";

export async function UserCard() {
    const session = await auth();
    let experience_value = 190;
    let max_experience_value = 200;
    let user_level = 10;
    let bar_width = `${(experience_value/max_experience_value)*100}%`;
    let username = "Taskmaster";
    if(session?.user?.name) username = session?.user?.name;
    return (
        <div className="m-5 bg-slate-300 dark:bg-slate-950 flex flex-row max-w-screen-md rounded-md">
            <UserAvatar avatarSrc={session?.user?.image}/>
            <div className="p-2 flex flex-col grow">
                <div className="p-1">{session?.user?.name}</div>
                <div className="p-1">Level {user_level}</div>
                <div className="p-1 flex items-center">
                    <div className='grow  bg-gray-100 rounded-3xl h-5'>
                        <div className='bg-indigo-600 h-5 rounded-3xl text-xs' role='progressbar' style={{ width: bar_width }} aria-valuenow={experience_value} aria-valuemin={0} aria-valuemax={max_experience_value}></div>
                    </div>
                    <p className="h-5 pl-5 text-center leading-5">{experience_value}/{max_experience_value} XP</p>
                </div>
            </div>
        </div>
    )
}