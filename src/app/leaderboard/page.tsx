import { auth } from "@/auth";
import Navigation from "@/components/navigation/navigation";
import { randomInt } from "crypto";
import { redirect } from "next/navigation";
import { get_user_id_from_session_email, get_user_leaderboard_data } from "../api/database/database";
import { GetLevelFromExperience } from "@/components/general_use/utils";

export default async function Home() {
  const session = await auth()
  if (!session) redirect('/login');
  let logged_in_user_id = null;
  if(session.user?.email) logged_in_user_id = await get_user_id_from_session_email(session.user.email);
  const userData = await get_user_leaderboard_data();
  userData.forEach((element: { level: number; experience: number; }) => {
    let values = GetLevelFromExperience(element.experience);
    element.level=values[0];
  });
  //Sort descending - highest level user should be at the top!
  userData.sort((a, b) => b.level - a.level || b.experience - a.experience);
  return (
    <main>
      <Navigation />
      <div className="flex flex-row justify-center">
      <table className="m-5 w-2/3 border">
        <tbody>
          <tr>
              <th className="border m-2">Name</th>
              <th className="border m-2">Level</th>
              <th className="border m-2">Total XP</th>
          </tr>
        {userData.map((user) => (
          <tr className={user._id.toString() === logged_in_user_id.toString() ? "bg-slate-950" : "bg-slate-800"} key={user._id}>
            <td className="border m-2">{user.name}</td>
            <td className="border m-2">{user.level}</td>
            <td className="border m-2">{user.experience}</td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
    </main>
  );
}