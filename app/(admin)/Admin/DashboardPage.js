"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PageLoader from "@/components/PageLoader";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // If no session, redirect to sign-in page
    if (!session) {
      router.push("/api/auth/signin/");
    }
  }, [session, status]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard-stats");
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          console.error("Failed to load stats:", data);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    }
    fetchStats();
  }, []);

  if (!stats) return <PageLoader />;

  // If user is not admin
  if (session?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    console.log("Session email:", session?.user?.email);
    console.log("Admin email:", process.env.NEXT_PUBLIC_ADMIN_EMAIL);
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-bold">Access Denied</h2>
        <p>You are not authorized to view this page.</p>
        <Link href="/" className="mt-3 text-[#0680d0] text-lg hover:underline">
          <p>
            Visit Site <span>Sodra Collection</span>
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard title="Total Users" value={stats.users} />
        <DashboardCard title="Dresses" value={stats.dresses} />
        <DashboardCard title="Accessories" value={stats.accessories} />
        <DashboardCard title="Art Pieces" value={stats.artPieces} />
        <DashboardCard title="MadeToOrders" value={stats.madeToOrders} />
        <DashboardCard
          title="MadeToOrderSubmissions"
          value={stats.madeToOrderSubmission}
        />
        <DashboardCard title="Orders" value={stats.orders} />
        <DashboardCard title="Contact-Messages" value={stats.contactMessages} />
      </div>
    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
