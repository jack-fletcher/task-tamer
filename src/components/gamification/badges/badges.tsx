import { auth, signOut } from "@/auth"
import { Badge } from "./badge";
import { get_all_badge_data, get_user_badge_data_from_id, get_user_id_from_session_email } from "@/app/api/database/database";

function user_completed_badge_date(user_badge_data:any,badge_id:any)
{
  for(const [key, value] of Object.entries(user_badge_data))
  {
    if(value.badge_id.match(badge_id))
      {
        return new Date(value.completion_date).toLocaleDateString();
      }
  }
  return "";
}

export async function Badges(props:any) {
  const session = await auth()
  if (!session) return null;
  const date = new Date();
  const badges = await get_all_badge_data();
  let user_id = null;
  if(session.user?.email) user_id = await get_user_id_from_session_email(session.user.email);
  let user_badge_data = await get_user_badge_data_from_id(user_id);
  
  return (
    <div className="flex flex-row flex-wrap justify-center">
      {badges.map((badge:any, index:number) =>
         <Badge key={badge._id} badgeName={badge.name} badgeDescription={badge.description} badgeImg={badge.image} badgeCompletionDate={user_completed_badge_date(user_badge_data,badge._id)}/>
      )}
    </div>
  )
}