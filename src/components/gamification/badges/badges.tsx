import { auth, signOut } from "@/auth"
import { Badge } from "./badge";
import { get_all_badge_data, get_user_badge_data_from_id, get_user_id_from_session_email } from "@/app/api/database/database";

function user_completed_badge_date(user_badge_data:any,badge_id:any)
{
  //Typescript needs to know that it's a specific data type.
  //Derived from:
  //https://stackoverflow.com/questions/59838835/typescript-3-x-access-properties-of-type-unknown
  //https://www.totaltypescript.com/concepts/object-is-of-type-unknown
  interface Badge {
    badge_id: string;
    completion_date: string
  }

  for (const [key, badge] of Object.entries(user_badge_data)) {
    if ((badge as Badge).badge_id.match(badge_id)) {
      return new Date((badge as Badge).completion_date).toLocaleDateString();
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