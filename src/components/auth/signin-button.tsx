import { auth, signIn } from "@/auth"
import login from "../../app/assets/imgs/login.svg";
import Image from 'next/image'

export async function SignIn(props:any) {
  const session = await auth()
  if (session) return null;
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button className={props.className} type="submit"><Image src={login} alt="Sign In"></Image></button>
    </form>
  )
}