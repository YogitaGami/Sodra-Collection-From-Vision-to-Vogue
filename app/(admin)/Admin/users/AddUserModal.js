"use client";
import { useState } from "react";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

export default function AddUserModal({ onClose, onUserAdded }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "user",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  if (loading) return <PageLoader />;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        toast.info("Failed to add user data");
      } else {
        toast.info("User Data added successfully");
        onUserAdded(data); //onClose()
      }
    } catch {
      toast.info("Failed to add user data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="UserName"
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <input
            name="image"
            placeholder="Image URL"
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="bg-[#0680d0] text-white px-4 py-2 rounded hover:bg-[#44b1f9]" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
