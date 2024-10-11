import { auth, signIn } from "@/auth"
import { SignIn } from "@/components/auth/signin-button";
import Navigation from "@/components/navigation/navigation";
import { redirect } from "next/navigation";

export default async function Home() {
  //If authenticated, don't send them to login. Go straight to home.
  const session = await auth()
  if(session)
  {
    redirect("/home");
  }
  return (
    <body>
      <main>
        <Navigation />
      </main>
    </body>
  );
}
