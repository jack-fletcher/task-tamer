import { auth } from "@/auth";
import Navigation from "@/components/navigation/navigation";
import { randomInt } from "crypto";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  if (!session) redirect('/login');
  const userData = [
    { 
      name: "User1",
      experience: randomInt(200),
      level: randomInt(10),
    },
    { 
      name: "User2",
      experience: randomInt(200),
      level: randomInt(10),
    },
    { 
      name: "User3",
      experience: randomInt(200),
      level: randomInt(10),
    }
  ]
  //Sort descending - highest level user should be at the top!
  userData.sort((a, b) => b.level - a.level || b.experience - a.experience);
  return (
    <main>
      <Navigation />
      <div className="flex flex-row justify-center">
      <table className="m-5 w-2/3 border">
        <th className="border m-2">Name</th>
        <th className="border m-2">Level</th>
        <th className="border m-2">Total XP</th>
        {userData.map((user) => (
          <tr>
            <td className="border m-2">{user.name}</td>
            <td className="border m-2">{user.level}</td>
            <td className="border m-2">{user.experience}</td>
          </tr>
        ))}
      </table>
      </div>
    </main>
  );
}