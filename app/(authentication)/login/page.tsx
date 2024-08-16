import { getServerSession } from "next-auth";
import LoginForm from "./form";
import authOptions from "@/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return <LoginForm />;
}