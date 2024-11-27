import { auth } from "@/auth";
import { UserAvatar } from "../user-avatar/user-avatar";
import { get_user_experience, get_user_id_from_session_email, get_user_name } from "@/app/api/database/database";
import { GetLevelFromExperience, GetMaxExperiencePerLevel } from "../general_use/utils";

export async function UserCard() {
    const session = await auth();
    if (session == null) return;
    let user_id = null;
    if (session.user?.email) user_id = await get_user_id_from_session_email(session.user.email);
    let experience_value = await get_user_experience(user_id);
    let max_experience_value = GetMaxExperiencePerLevel();
    const values = GetLevelFromExperience(experience_value);
    let user_level = values[0];
    experience_value = values[1];
    let bar_width = `${(experience_value / max_experience_value) * 100}%`;
    let username = get_user_name(user_id);

    return (
        <div className="m-5 bg-slate-300 dark:bg-slate-950 flex flex-row max-w-screen-md rounded-md">
            <UserAvatar avatarSrc={session?.user?.image} />
            <div className="p-2 flex flex-col grow">
                <div className="p-1 font-bold">{username}</div>
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