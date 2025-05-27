"use client";

import { useState, useEffect } from "react";
import AddDressModal from "./AddDressModal";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

export default function DressesPage() {
  const [dresses, setDresses] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch dresses from API
  async function fetchDresses() {
    setLoading(true);
    try {
      const res = await fetch("/api/dresses");
      const data = await res.json();
      setDresses(data);
      setFiltered(data);
    } catch (error) {
      toast.info("Failed to fetch dresses");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDresses();
  }, []);

  // Search filter
  useEffect(() => {
    if (!search) return setFiltered(dresses);
    const filteredData = dresses.filter((d) =>
      [d.name, d.type, d.category, d.size, d.fitting, d.madeBy]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(search.toLowerCase()))
    );
    setFiltered(filteredData);
  }, [search, dresses]);

  if(loading) return <PageLoader/>

  // Delete dress
  async function handleDelete(id) {
    if (!confirm("Are you sure to delete this dress?")) return;
    try {
      const res = await fetch(`/api/dresses/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.info("Deleted successfully");
        fetchDresses();
      } else {
        toast.info("Delete failed");
      }
    } catch {
      toast.info("Delete failed");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dresses Admin Panel</h1>

      <div className="flex justify-between mb-4 flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name, type, category, etc..."
          className="border rounded px-4 py-2 w-full sm:w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-[#0680d0] text-white px-6 py-2 rounded hover:bg-[#44b1f9]"
          onClick={() => setShowAddModal(true)}
        >
          Add Dress
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No dresses found.</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Image IDs</th>
                <th className="border px-2 py-1">Type</th>
                <th className="border px-2 py-1">Category</th>
                <th className="border px-2 py-1">Tag</th>
                <th className="border px-2 py-1">Price</th>
                <th className="border px-2 py-1">Retail</th>
                <th className="border px-2 py-1">Deposit</th>
                <th className="border px-2 py-1">Size</th>
                <th className="border px-2 py-1">Fitting</th>
                <th className="border px-2 py-1">Made By</th>
                <th className="border px-2 py-1">Info</th>
                <th className="border px-2 py-1">Desc</th>
                <th className="border px-2 py-1">Color</th>
                <th className="border px-2 py-1">Material</th>
                <th className="border px-2 py-1">StylistNote</th>
                <th className="border px-2 py-1">care</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((dress) => (
                <tr key={dress._id}>
                  <td className="border px-2 py-1">{dress.name}</td>
                  <td className="border px-2 py-1">
                    {Array.isArray(dress.imageId)
                      ? dress.imageId.join(", ")
                      : dress.imageId}
                  </td>
                  <td className="border px-2 py-1">{dress.type}</td>
                  <td className="border px-2 py-1">{dress.category}</td>
                  <td className="border px-2 py-1">{dress.tag}</td>
                  {/* Price object display */}
                  <td className="border px-2 py-1">
                    {dress.price
                      ? Object.entries(dress.price)
                          .map(([key, value]) => `${key}: ₹${value}`)
                          .join(", ")
                      : ""}
                  </td>
                  <td className="border px-2 py-1">₹{dress.retail}</td>
                  <td className="border px-2 py-1">₹{dress.deposit}</td>
                  <td className="border px-2 py-1">{dress.size}</td>
                  <td className="border px-2 py-1">{dress.fitting}</td>
                  <td className="border px-2 py-1">{dress.madeBy}</td>
                  <td className="border px-2 py-1">{dress.info}</td>
                  <td className="border px-2 py-1">{dress.desc}</td>
                  <td className="border px-2 py-1">{dress.color}</td>
                  <td className="border px-2 py-1">{dress.material}</td>
                  <td className="border px-2 py-1">{dress.stylistNote}</td>
                  <td className="border px-2 py-1">{dress.care}</td>
                  {/* <!-- Booking Dates (readonly for display) --> */}
                  <div>
                    <label class="block font-medium">Bookings</label>
                    <ul class="list-disc ml-5 text-sm text-gray-600">
                      <li>May 4, 2025 – May 7, 2025</li>
                      <li>May 4, 2025 – May 7, 2025</li>
                      <li>May 28, 2025 – June 2, 2025</li>
                    </ul>
                  </div>
                  <td className="border px-2 py-1 space-x-2 whitespace-nowrap">
                    <a
                      href={`/Admin/dresses/${dress._id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(dress._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <AddDressModal
          onClose={() => {
            setShowAddModal(false);
            fetchDresses();
          }}
        />
      )}
    </div>
  );
}
