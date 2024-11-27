import { auth } from "@/auth";
import Image from "next/image";
import DefaultUserAvatar from "@/app/assets/imgs/default_user.png";
export async function UserAvatar(props: any) {
    const session = await auth();
    let UserAvatar = DefaultUserAvatar;
    if (props.avatarSrc) {
        UserAvatar = props.avatarSrc;
    }
    return (
        <div className="m-1 relative h-24 w-24">
            <Image className="hover:scale-110 rounded-2xl" fill={true} src={UserAvatar} alt="User avatar" />
        </div>
    )
}