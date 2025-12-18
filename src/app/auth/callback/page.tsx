import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";

export default async function CallbackPage() {
  const session = await getServerSession(authOptions);

  // If there is no session, send user back to login
  if (!session) {
    return redirect("/login");
  }

  const role = session.user?.role;
  if (role === "admin") {
    return redirect("/admin/dashboard");
  }

  return redirect("/dashboard");
}
