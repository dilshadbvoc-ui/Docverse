import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar user={session} />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
