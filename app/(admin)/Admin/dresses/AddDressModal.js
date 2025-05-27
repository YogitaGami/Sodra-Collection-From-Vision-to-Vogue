"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function AddDressModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    category: "",
    price: { 3: "", 5: "", 7: "", 11: "" },
    deposit: "",
    retail: "",
    fitting: "",
    size: "",
    desc: "",
    info: "",
    code: "",
    color: "",
    material: "",
    stylistNote: "",
    care: "",
    imageId: [],
    tag: "",
    madeBy: "",
    collectionType: "Dresses",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    // For price object
    if (["3", "5", "7", "11"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        price: { ...prev.price, [name]: value },
      }));
    } 
    // For imageId array
    else if (name === "imageId") {
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
      deposit: parseNumber(form.deposit),
      retail: parseNumber(form.retail),
      price: {
        3: parseNumber(form.price[3]),
        5: parseNumber(form.price[5]),
        7: parseNumber(form.price[7]),
        11: parseNumber(form.price[11]),
      },
    };

    try {
      const res = await fetch("/api/dresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedForm),
      });

      if (!res.ok) {
        toast.info("Failed to add dress");
      } else {
        toast.info("Dress added successfully");
        onClose();
      }
    } catch {
      toast.info("Failed to add dress");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[400px] shadow-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Dress</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            "name", "type", "category", "fitting", "size","desc",
            "info", "code", "color", "material",
            "stylistNote", "care", "tag", "madeBy"
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

          {/* Price by duration */}
          <div>
            <label className="block font-medium">Price (in ₹)</label>
            {[3, 5, 7, 11].map((day) => (
              <input
                key={day}
                type="number"
                name={String(day)}
                placeholder={`Price for ${day} days`}
                value={form.price[day]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            ))}
          </div>

          {/* Deposit */}
          <input
            type="number"
            name="deposit"
            placeholder="Deposit"
            value={form.deposit}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          {/* Retail */}
          <input
            type="number"
            name="retail"
            placeholder="Retail Price"
            value={form.retail}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          {/* Image IDs */}
          <input
            type="text"
            name="imageId"
            placeholder="Image IDs (comma separated)"
            value={form.imageId.join(",")}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          {/* Collection Type */}
          <input
            type="text"
            name="collectionType"
            placeholder="Collection Type"
            value={form.collectionType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          <div className="flex justify-end space-x-2 pt-3">
            <button
              type="button"
              onClick={onClose}
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
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
