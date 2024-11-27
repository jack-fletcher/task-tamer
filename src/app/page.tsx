import { auth } from "@/auth";
import Login from "./login/page";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  if (session) {
    redirect("/home");
  }
  return (
    <Login />
  );
}
