import RegisterForm from "./form";
import authOptions from "@/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Register() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return <RegisterForm />;
}