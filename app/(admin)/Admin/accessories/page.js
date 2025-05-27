"use client";

import { useState, useEffect } from "react";
import AddAccessoryModal from "./AddAccessoryModal";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

export default function AccessoriesPage() {
  const [accessories, setAccessories] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchAccessories() {
    setLoading(true);
    try {
      const res = await fetch("/api/accessory");
      const data = await res.json();
      setAccessories(data);
      setFiltered(data);
    } catch (error) {
      toast.info("Failed to fetch accessories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAccessories();
  }, []);

  useEffect(() => {
    if (!search) return setFiltered(accessories);
    const filteredData = accessories.filter((a) =>
      [a.name, a.type, a.category, a.size, a.fitting, a.madeBy]
      .filter(Boolean)
        .some((field) => field.toLowerCase().includes(search.toLowerCase()))
    );
    setFiltered(filteredData);
  }, [search, accessories]);

  if (loading) return <PageLoader />;

  async function handleDelete(id) {
    setLoading(true)
    if (!confirm("Are you sure to delete this accessory?")) return;
    try {
      const res = await fetch(`/api/accessory/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.info("Deleted successfully");
        fetchAccessories();
      } else {
        toast.info("Delete failed");
      }
    } catch {
      toast.info("Delete failed");
    }
    finally{
        setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Accessories Admin Panel</h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name, type or category..."
          className="border rounded px-4 py-2 w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-[#0680d0] text-white px-6 py-2 rounded hover:bg-[#44b1f9]"
          onClick={() => setShowAddModal(true)}
        >
          Add Accessory
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No accessories found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Image IDs</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Category</th>
              <th className="border px-2 py-1">Tag</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Retail</th>
              <th className="border px-2 py-1">Deposit</th>
              {/* <th className="border px-2 py-1">Size</th> */}
              <th className="border px-2 py-1">Made By</th>
              <th className="border px-2 py-1">Info</th>
              <th className="border px-2 py-1">Desc</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((acc) => (
              <tr key={acc._id}>
                <td className="border px-2 py-1">{acc.name}</td>
                <td className="border px-2 py-1">
                    {Array.isArray(acc.imageId)
                      ? acc.imageId.join(", ")
                      : acc.imageId}
                  </td>
                <td className="border px-2 py-1">{acc.type}</td>
                <td className="border px-2 py-1">{acc.category}</td>
                <td className="border px-2 py-1">{acc.tag}</td>
                <td className="border px-2 py-1">
                    {acc.price
                      ? Object.entries(acc.price)
                          .map(([key, value]) => `${key}: ₹${value}`)
                          .join(", ")
                      : ""}
                </td>
                <td className="border px-2 py-1">₹{acc.retail}</td>
                <td className="border px-2 py-1">₹{acc.deposit}</td>
                {/* <td className="border px-2 py-1">{acc.size}</td>
                <td className="border px-2 py-1">{acc.fitting}</td> */}
                <td className="border px-2 py-1">{acc.madeBy}</td>
                <td className="border px-2 py-1">{acc.info}</td>
                <td className="border px-2 py-1">{acc.desc}</td>
                <td className="border px-2 py-1 space-x-2 whitespace-nowrap">
                  <a
                    href={`/Admin/accessories/${acc._id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                  <button
                    disabled={loading}
                    onClick={() => handleDelete(acc._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAddModal && (
        <AddAccessoryModal
          onClose={() => {
            setShowAddModal(false);
            fetchAccessories();
          }}
        />
      )}
    </div>
  );
}
