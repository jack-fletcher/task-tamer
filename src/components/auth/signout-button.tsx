import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation";
 
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
      <button className={props.className} type="submit">Sign Out</button>
    </form>
  )
}