import { auth, signIn } from "@/auth"
import { SignIn } from "@/components/auth/signin-button";
import Navigation from "@/components/navigation/navigation";
import { redirect } from "next/navigation";
import GoogleDark from "../assets/imgs/google_dark.png";
import Image from 'next/image'

export default async function Home() {
  //If authenticated, don't send them to login. Go straight to home.
  const session = await auth()
  if (session) {
    redirect("/home");
  }
  return (
    <body>
      <main>
        <Navigation />
        <div className="flex flex-col h-lvh p-20 items-center">
          <div className="p-5 grow-1 w-full md:w-1/2">
            <h1 className="text-5xl text-center p-2 font-bold">Gamify your life with Task Tamer.</h1>
            <p className="text-3xl text-center p-2">Compete with friends and family to complete the most tasks!</p>
          </div>
          <div className="p-5 w-full md:w-1/2">
            <form className="flex flex-col items-center p-5"
              action={async () => {
                "use server"
                await signIn("google")
              }}
            >
              <button className="" type="submit"><Image src={GoogleDark} alt="Continue with Google"></Image></button>
            </form>
          </div>
        </div>
      </main>
    </body>
  );
}
