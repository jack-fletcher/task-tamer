import { auth, signOut } from "@/auth"
import { UserAvatar } from "@/components/user-avatar/user-avatar";
import { redirect } from "next/navigation";
import Image from "next/image";
import clsx from 'clsx';

export async function Badge(props: any) {
    return (
        <div className="m-5 border h-80 w-80 flex flex-col">
            <h3 className="border text-center text-xl font-bold text-yellow-500">{props.badgeName}</h3>
            <div className="grow mt-5 h-40 w-80 relative">
                <Image className={clsx("rounded-2xl object-contain",
                    {
                        'opacity-35': !props.badgeCompletionDate,
                        'opacity-100': props.badgeCompletionDate,
                    })} fill={true} src={props.badgeImg} alt="User avatar" />
            </div>
            <div className="grow flex flex-col justify-end">
                <p className="border text-center">{props.badgeDescription}</p>
                <p className="border text-center">{props.badgeCompletionDate ? "You completed this on: " + props.badgeCompletionDate + " ✅" : "Yet to be completed"}</p>
            </div>
        </div>
    )
}