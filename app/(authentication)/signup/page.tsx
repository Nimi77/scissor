import authOptions from "@/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"
import RegisterForm from "./form";

export default async function Register() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/login");
  }
  return <RegisterForm />;
}