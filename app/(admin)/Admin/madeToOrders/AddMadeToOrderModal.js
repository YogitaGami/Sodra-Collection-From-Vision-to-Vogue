"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function AddArtpieceModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    category: "",
    tag: "",
    size: {"S":"","M":"","L":"","XL":"","XXL":""},
    desc: "",
    info: "",
    imageId: [],
    code: "",
    style: "",
    material: "",
    madeBy: "",
    position: "",
    collectionType: "Made To Order",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    if (["S", "M", "L", "XL", "XXL"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        size: { ...prev.size, [name]: value },
      }));
    }
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
      size: {
        S: parseNumber(form.price[S]),
        M: parseNumber(form.price[M]),
        L: parseNumber(form.price[L]),
        XL: parseNumber(form.price[XL]),
        XXL: parseNumber(form.price[XXL]),
      },
      position: parseNumber(form.position)
    };

    try {
      const res = await fetch("/api/madeToOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedForm),
      });
      if (!res.ok) throw new Error("Add failed");
      toast.info("MadeToOrder Dress added");
      onClose();
    } catch (err) {
      toast.info("Failed to add MadeToOrder dress");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[400px] shadow-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Add New MadeToOrder Dress</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            "name", "type", "category","desc",
            "info", "code","style", "material","tag", "madeBy"
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
            name="position"
            type="number"
            min="0"
            value={form.position}
            onChange={handleChange}
            placeholder="Position"
            required
            className="w-full border rounded px-3 py-2"
          />
          
          <div>
            <label className="block font-medium">Size (in S,M...)</label>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <input
                key={size}
                type="number"
                name={String(size)}
                placeholder={`Price for ${size} size`}
                value={form.size[size]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            ))}
          </div>

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
