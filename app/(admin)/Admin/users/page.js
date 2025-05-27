"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddUserModal from "./AddUserModal";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try{
      const res = await fetch("/api/users");
      const data = await res.json();
      const normalizedData = Array.isArray(data) ? data : data ? [data] : [];
      setUsers(normalizedData);
      setFilteredUsers(normalizedData);
      } catch (error) {
      toast.info("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>{
      const nameOrUsername = user?.name || user?.username || "";
      return nameOrUsername.toLowerCase().includes(search.toLowerCase())
    });
    setFilteredUsers(filtered);
  }, [users, search]);

  if (loading) return <PageLoader />;
  
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.info("Deleted successfully");
        setUsers(users.filter((user) => user._id !== id));
      } else {
        toast.info("Delete failed");
      }
    } catch {
      toast.info("Delete failed");
    } finally{
        setLoading(false)
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          className="bg-[#0680d0] text-white px-4 py-2 rounded hover:bg-[#44b1f9]"
          onClick={() => setShowModal(true)}
        >
          Add User
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-3 py-2 border rounded w-full md:w-1/2"
      />

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Role</th>
              <th className="text-left p-3">Created</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 flex space-x-2">
                  <Link
                    href={`/admin/users/${user._id}/edit`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:underline"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onUserAdded={(newUser) => {
            setUsers([newUser, ...users]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
