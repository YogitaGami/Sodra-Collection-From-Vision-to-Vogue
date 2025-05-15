"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import PageLoader from "@/components/PageLoader";


export default function AdminContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    size: "",
    isAvailable: true,
  });

  useEffect(() => {
    if (status === "loading") return;

    // If no session, redirect to sign-in page
    if (!session) {
      router.push("/api/auth/signin/");
    }
  }, [session, status]);

  // If session is loading
  if (status === "loading") return <PageLoader />;

  // If user is not admin
  if (session?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    console.log("Session email:", session?.user?.email);
    console.log("Admin email:", process.env.NEXT_PUBLIC_ADMIN_EMAIL);
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-bold">Access Denied</h2>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }


  // Admin form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/addDresses", {
        ...formData,
        price: Number(formData.price),
        size: formData.size.split(",").map((s) => s.trim()),
      });
      alert("Dress added successfully!");
    } catch (err) {
      alert("Error adding dress");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Add New Dress</h2>
      <input
        name="name"
        onChange={handleChange}
        placeholder="Name"
        required
        className="border p-2 w-full"
      />
      <input
        name="category"
        onChange={handleChange}
        placeholder="Category"
        required
        className="border p-2 w-full"
      />
      <input
        name="price"
        type="number"
        onChange={handleChange}
        placeholder="Price"
        required
        className="border p-2 w-full"
      />
      <input
        name="size"
        onChange={handleChange}
        placeholder="Sizes (comma separated)"
        className="border p-2 w-full"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isAvailable"
          checked={formData.isAvailable}
          onChange={handleChange}
        />
        Is Available
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Dress
      </button>
    </form>
  );
}
