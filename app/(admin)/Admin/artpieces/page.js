"use client";
import React, { useEffect, useState } from "react";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

export default function ArtpiecesAdmin() {
  const [artpieces, setArtpieces] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all artpieces
  async function fetchArtpieces() {
    setLoading(true)
    try {
      const res = await fetch("/api/artPiece");
      const data = await res.json();
      setArtpieces(data);
      setFiltered(data);
    } catch (err) {
      toast.info("Failed to fetch artPiece");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArtpieces();
  }, []);

  // Filter artpieces by search
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(artpieces);
    } else {
      setFiltered(
        artpieces.filter((a) =>
          a.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, artpieces]);

  if (loading) return <PageLoader />;
  
  // Delete artpiece
  async function handleDelete(id) {
    setLoading(true)
    if (!confirm("Are you sure you want to delete this artpiece?")) return;
    try {
      const res = await fetch(`/api/artPiece/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.info("Deleted successfully");
        fetchArtpieces();
      } else {
        toast.info("Delete failed");
      }
     } catch (err) {
      toast.info("Failed to fetch accessories");
    } finally{
        setLoading(false)
    }
    
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search artpieces..."
          className="border rounded px-4 py-2 w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#0680d0] text-white px-6 py-2 rounded hover:bg-[#44b1f9]"
        >
          Add New Artpiece
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
            <th className="border px-4 py-2">Price</th>
            <th className="border px-2 py-1">Made By</th>
            <th className="border px-2 py-1">Info</th>
            <th className="border px-2 py-1">Desc</th>
            <th className="border px-2 py-1">Material</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No artpieces found.
              </td>
            </tr>
          )}
          {filtered.map((art) => (
            <tr key={art._id}>
              <td className="border px-4 py-2">{art.name}</td>
              <td className="border px-2 py-1">
                {Array.isArray(art.imageId)
                  ? art.imageId.join(", ")
                  : art.imageId}
              </td>
              <td className="border px-2 py-1">{art.type}</td>

              <td className="border px-4 py-2">{art.category}</td>
              <td className="border px-2 py-1">{art.tag}</td>
              <td className="border px-2 py-1">
                {art.price
                  ? Object.entries(art.price)
                      .map(([key, value]) => `${key}: ₹${value}`)
                      .join(", ")
                  : ""}
              </td>
              <td className="border px-2 py-1">{art.madeBy}</td>
              <td className="border px-2 py-1">{art.info}</td>
              <td className="border px-2 py-1">{art.desc}</td>
              <td className="border px-2 py-1">{art.material}</td>

              <td className="border px-2 py-1 space-x-2 whitespace-nowrap">
                <a
                  href={`/admin/artpieces/${art._id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(art._id)}
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
        <AddArtpieceModal
          onClose={() => {
            setShowAddModal(false);
            fetchArtpieces();
          }}
        />
      )}
    </div>
  );
}
