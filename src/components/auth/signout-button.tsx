import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation";
import logout from "../../app/assets/imgs/logout.svg";
import Image from 'next/image'


export async function SignOut(props:any) {
  const session = await auth()
  if (!session) return null;
  return (
    <form
      action={async () => {
        "use server"
        await signOut({redirectTo: '/login'})
      }}
    >
      <button className={props.className} type="submit"><Image src={logout} alt="Sign Out"></Image></button>
    </form>
  )
}