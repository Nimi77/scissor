import { getServerSession } from "next-auth";
import UserLinks from "./link/page";
import authOptions from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  console.log(session?.user?.email);
  return <UserLinks />;
}