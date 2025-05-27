"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

export default function EditDressPage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    type: "",
    category: "",
    tag:"",
    price: {},
    retail:"",
    deposit: "",
    desc: "",
    info:"",
    imageId: [],
    sizes: "",
    fitting:"",
    color: "",
    material:"",
    stylistNote: "",
    care: "",
    available: true,
  });

  const [loading, setLoading] = useState(false);

  // Fetch dress details
  useEffect(() => {
    async function fetchDress() {
      try {
        const res = await fetch(`/api/dresses/${id}`);
        const data = await res.json();
        setForm({
          name: data.name || "",
          type: data.type || "",
          category: data.category || "",
          tag: data.tag || "",
          price: data.price || {},
          retail: data.retail || "",
          deposit: data.deposit || "",
          desc: data.desc || "",
          info: data.info || "",
          imageId: data.imageId || [],
          sizes: data.sizes || "",
          sizes: data.fitting || "",
          color: data.color || "",
          material: data.material || "",
          stylistNote: data.stylistNote || "",
          care: data.care || "",
          available: data.available ?? true,
          rental: data.rental ?? false,
        });
      } catch (error) {
        toast.info("Failed to fetch dress details");
      }
    }
    fetchDress();
  }, [id]);

  if (loading) return <PageLoader/> 

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handlePriceChange(index, key, value) {
    const updatedPrice = { ...form.price };
    delete updatedPrice[Object.keys(form.price)[index]];
    if (key) updatedPrice[key] = Number(value);
    setForm({ ...form, price: updatedPrice });
  }

  function addPriceField() {
    setForm({ ...form, price: { ...form.price, "": 0 } });
  }

  function removePriceField(key) {
    const updatedPrice = { ...form.price };
    delete updatedPrice[key];
    setForm({ ...form, price: updatedPrice });
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
      const res = await fetch(`/api/dresses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        toast.info("Failed to update dress");
      } else {
        toast.info("Dress updated successfully");
        router.push("/Admin/dresses");
      }
    } catch {
      toast.info("Failed to update dress");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Dress</h1>
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

        <div>
          <label className="font-semibold">Price (e.g. Age/Size based):</label>
          {Object.entries(form.price).map(([key, value], index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={key}
                onChange={(e) =>
                  handlePriceChange(index, e.target.value, value)
                }
                placeholder="Key (e.g. 3, 5, 7)"
                className="w-1/2 border rounded px-2 py-1"
              />
              <input
                type="number"
                value={value}
                onChange={(e) =>
                  handlePriceChange(index, key, e.target.value)
                }
                placeholder="Price"
                className="w-1/2 border rounded px-2 py-1"
              />
              <button
                type="button"
                onClick={() => removePriceField(key)}
                className="text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPriceField}
            className="text-sm text-blue-600 underline"
          >
            + Add Price Field
          </button>
        </div>

        <input
          type="text"
          name="retail"
          value={form.retail}
          onChange={handleChange}
          placeholder="Retail"
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="text"
          name="deposit"
          value={form.deposit}
          onChange={handleChange}
          placeholder="Deposit"
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
          name="sizes"
          value={form.sizes}
          onChange={handleChange}
          placeholder="Sizes (e.g. S, M, L)"
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="text"
          name="material"
          value={form.material}
          onChange={handleChange}
          placeholder="Material (e.g. Silk, Cotton)"
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="stylistNote"
          value={form.stylistNote}
          onChange={handleChange}
          placeholder="StylistNote"
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="care"
          value={form.care}
          onChange={handleChange}
          placeholder="Care"
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          <label htmlFor="available">Available</label>
        </div>
        <button
          type="submit"
          className="bg-[#0680d0] text-white px-6 py-2 rounded hover:bg-[#44b1f9]"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Dress"}
        </button>
      </form>
    </div>
  );
}
