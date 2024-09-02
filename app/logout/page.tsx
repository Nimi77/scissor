import Logout from "./logout";
import authOptions from "@/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function LogOut(){
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return <Logout/>
}