"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";

export default function EditArtpiece({ params }) {
  const router = useRouter();
  const { id } = params;

  const [form, setForm] = useState({
    name: "",
    type: "",
    category: "",
    tag: "",
    price: "",
    desc: "",
    info: "",
    imageId: [],
    material: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchArtpiece() {
      try {
        const res = await fetch(`/api/artPiece/${id}`);
        const data = await res.json();
        setForm(data);
      } catch {
        toast.info("Failed to fetch artpiece data");
      }
    }
    fetchArtpiece();
  }, [id]);

  if (loading) return <PageLoader />;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleImageIdChange(index, value) {
    const updatedImages = [...form.imageId];
    updatedImages[index] = value;
    setForm({ ...form, imageId: updatedImages });
  }

  function addImageIdField() {
    setForm({ ...form, imageId: [...form.imageId, ""] });
  }

  function removeImageIdField(index) {
    const updatedImages = form.imageId.filter((_, i) => i !== index);
    setForm({ ...form, imageId: updatedImages });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/artPiece/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        alert("Update failed");
      } else {
        alert("Updated successfully");
        router.push("/admin/artpieces");
      }
    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Artpiece</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="tag"
          value={form.tag}
          onChange={handleChange}
          placeholder="Tag"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          min={0}
          required
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="info"
          value={form.info}
          onChange={handleChange}
          placeholder="Info"
          className="w-full border rounded px-3 py-2"
        />
        <div>
          <label className="font-semibold">Image IDs:</label>
          {form.imageId.map((id, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={id}
                onChange={(e) => handleImageIdChange(index, e.target.value)}
                placeholder="Image ID"
                className="w-full border rounded px-2 py-1"
              />
              <button
                type="button"
                onClick={() => removeImageIdField(index)}
                className="text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageIdField}
            className="text-sm text-blue-600 underline"
          >
            + Add Image ID
          </button>
        </div>

        <input
          type="text"
          name="material"
          value={form.material}
          onChange={handleChange}
          placeholder="Material (e.g. Silk, Cotton)"
          className="w-full border rounded px-3 py-2"
        />
        <div className="flex justify-between pt-3">
          <button
            type="button"
            onClick={() => router.push("/admin/artpieces")}
            className="px-4 py-2 border rounded hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#0680d0] text-white px-6 py-2 rounded hover:bg-[#44b1f9]"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
