"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function AddArtpieceModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    category: "",
    tag: "",
    price: "",
    desc: "",
    info: "",
    imageId: [],
    code: "",
    material: "",
    madeBy: "",
    collectionType: "ArtPieces",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "imageId") {
      setForm({ ...form, imageId: value.split(",") });
    } 
    else {
      setForm({ ...form, [name]: value });
    }
  }

  const parseNumber = (value) => {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formattedForm = {
      ...form,
      price: parseNumber(form.price),
    };

    try {
      const res = await fetch("/api/artPiece", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedForm),
      });
      if (!res.ok) throw new Error("Add failed");
      toast.info("Artpiece added");
      onClose();
    } catch (err) {
      toast.info(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add New Artpiece</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            "name", "type", "category","desc",
            "info", "code", "material","tag", "madeBy"
          ].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          ))}
          
          <input
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="imageId"
            placeholder="Image IDs (comma separated)"
            value={form.imageId.join(",")}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="collectionType"
            placeholder="Collection Type"
            value={form.collectionType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0680d0] text-white px-6 py-2 rounded hover:bg-[#44b1f9]"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
