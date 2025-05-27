"use client";
import React, { useEffect, useState } from "react";
import AddMadeToOrderModal from "./AddMadeToOrderModal";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

export default function MadeToOrdersAdmin() {
  const [madeToOrders, setMadeToOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all madepieces
  async function fetchMadeToOrders() {
    try {
      const res = await fetch("/api/madeToOrder");
      if (!res.ok) throw new Error("Failed to fetch madeToOrders");
      const data = await res.json();
      setMadeToOrders(data);
      setFiltered(data);
    } catch (err) {
      toast.info(err.message);
    }
  }

  useEffect(() => {
    fetchMadeToOrders();
  }, []);

  // Filter madeToOrders by search
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(madeToOrders);
    } else {
      setFiltered(
        madeToOrders.filter((m) =>
          m.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, madeToOrders]);

  if (loading) return <PageLoader/>

  // Delete madeToOrder
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this madeToOrder Dress?")) return;
    try {
      const res = await fetch(`/api/madeToOrder/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.info("Deleted successfully");
      fetchMadeToOrders();
    } catch (err) {
      toast.info("Delete failed");
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search madeToOrders dress..."
          className="border rounded px-4 py-2 w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#0680d0] text-white px-6 py-2 rounded hover:bg-[#44b1f9]"
        >
          Add New MadeToOrder Dress
        </button>
      </div>

      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">ImageId</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Tag</th>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-2 py-1">Made By</th>
            <th className="border px-2 py-1">Info</th>
            <th className="border px-2 py-1">Desc</th>
            <th className="border px-2 py-1">Style</th>
            <th className="border px-2 py-1">Material</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No MadeToOrder Dress found.
              </td>
            </tr>
          )}
          {filtered.map((made) => (
            <tr key={made._id}>
              <td className="border px-4 py-2">{made.name}</td>
              <td className="border px-2 py-1">
                {Array.isArray(made.imageId)
                  ? made.imageId.join(", ")
                  : made.imageId}
              </td>
              <td className="border px-2 py-1">{made.type}</td>

              <td className="border px-4 py-2">{made.category}</td>
              <td className="border px-2 py-1">{made.tag}</td>
              <td className="border px-2 py-1">
                {made.size
                  ? Object.entries(made.size)
                      .map(([key, value]) => `${key}: ₹${value}`)
                      .join(", ")
                  : ""}
              </td>
              <td className="border px-2 py-1">{made.madeBy}</td>
              <td className="border px-2 py-1">{made.info}</td>
              <td className="border px-2 py-1">{made.desc}</td>
              <td className="border px-2 py-1">{made.style}</td>
              <td className="border px-2 py-1">{made.material}</td>

              <td className="border px-2 py-1 space-x-2 whitespace-nowrap">
                <a
                  href={`/Admin/madeToOrders/${made._id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(made._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <AddMadeToOrderModal
          onClose={() => {
            setShowAddModal(false);
            fetchMadeToOrders();
          }}
        />
      )}
    </div>
  );
}
