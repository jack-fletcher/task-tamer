import { auth } from "@/auth";
import { Badges } from "@/components/gamification/badges/badges";
import Navigation from "@/components/navigation/navigation";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  if (!session) redirect('/login');
  return (
    
    <main>
      <Navigation />
      <Badges/>
    </main>
  );
}