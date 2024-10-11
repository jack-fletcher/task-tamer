import { auth } from "../../auth"
 
export default async function GetSession() {
  const session = await auth()
    if(!session) return <div>DEBUG:No session found</div>
  if (!session.user) return <div>DEBUG:No user logged in</div>
 
  return (
      <div>DEBUG:User logged in</div>
  )
}