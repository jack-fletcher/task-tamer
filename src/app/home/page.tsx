import { auth } from "@/auth";
import { Tasks } from "@/components/gamification/tasks/tasks";
import Navigation from "@/components/navigation/navigation";
import { UserCard } from "@/components/user-card/user-card";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  if (!session) redirect('/login');
  return (
    
    <main>
      <Navigation />
      <UserCard/>
      <Tasks/>
    </main>
  );
}