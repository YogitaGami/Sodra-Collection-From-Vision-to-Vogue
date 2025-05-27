"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "", email: "", role: "user", image: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();
        setFormData(data);
    } catch (error) {
        toast.info("Failed to fetch user data");
      }
    }
    fetchUser();
  }, [id]);

  if (loading) return <PageLoader />;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        toast.info("Update failed");
      } else {
        toast.info("Updated successfully");
        router.push("/Admin/users");
      }
    } catch {
      toast.info("Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="UserName"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-[#0680d0] text-white px-6 py-2 rounded hover:bg-[#44b1f9]" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
