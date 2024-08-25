import authOptions from "@/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ResetPasswordForm from "./form";

export default async function ResetPassword() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signup");
  }
  return <ResetPasswordForm />;
}