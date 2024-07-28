import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import RegisterForm from "./form";

export default async function Register() {
  const session = await getServerSession(authOptions);
  if(session){
    redirect("/dashboard");
  }
  return <RegisterForm/>
}