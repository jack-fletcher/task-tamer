import { auth, signIn } from "@/auth"
 
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
      <button className={props.className} type="submit">Sign in</button>
    </form>
  )
}