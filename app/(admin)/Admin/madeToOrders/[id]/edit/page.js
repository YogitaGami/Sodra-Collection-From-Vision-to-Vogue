"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

export default function EditMadeToOrder({ params }) {
  const router = useRouter();
  const { id } = params;

  const [form, setForm] = useState({
    name: "",
    type: "",
    category: "",
    tag: "",
    desc: "",
    info: "",
    imageId: "",
    size: {},
    style: "",
    material: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMadeToOrder() {
      try {
        const res = await fetch(`/api/madeToOrder/${id}`);
        if (!res.ok) throw new Error("Failed to fetch ordering data");
        const data = await res.json();
        setForm(data);
      } catch {
        toast.info("Failed to fetch ordering data");
      }
    }
    fetchMadeToOrder();
  }, [id]);

  if (loading) return <PageLoader/>

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSizeChange(index, key, value) {
    const updatedSize = { ...form.size };
    delete updatedSize[Object.keys(form.size)[index]];
    if (key) updatedSize[key] = Number(value);
    setForm({ ...form, size: updatedSize });
  }

  function addSizeField() {
    setForm({ ...form, size: { ...form.size, "": 0 } });
  }

  function removeSizeField(key) {
    const updatedSize = { ...form.size };
    delete updatedSize[key];
    setForm({ ...form, size: updatedSize });
  }

  // function handleImageIdChange(index, value) {
  //   const updatedImages = [...form.imageId];
  //   updatedImages[index] = value;
  //   setForm({ ...form, imageId: updatedImages });
  // }

  // function addImageIdField() {
  //   setForm({ ...form, imageId: [...form.imageId, ""] });
  // }

  // function removeImageIdField(index) {
  //   const updatedImages = form.imageId.filter((_, i) => i !== index);
  //   setForm({ ...form, imageId: updatedImages });
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/madeToOrder/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        toast.info("Update failed");
      } else {
        toast.info("Updated successfully");
        router.push("/admin/madeToOrders");
      }
    } catch {
      toast.info("Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit madeToOrder</h1>
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

        <input
          type="text"
          name="imageId"
          value={form.imageId}
          onChange={handleChange}
          placeholder="ImageId"
          required
          className="w-full border rounded px-3 py-2"
        />
        {/* <div>
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
        </div> */}

         <div>
          <label className="font-semibold">Size (e.g. Size/Price based):</label>
          {Object.entries(form.size).map(([key, value], index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={key}
                onChange={(e) =>
                  handleSizeChange(index, e.target.value, value)
                }
                placeholder="Key (e.g. S, M, L)"
                className="w-1/2 border rounded px-2 py-1"
              />
              <input
                type="number"
                value={value}
                onChange={(e) =>
                  handleSizeChange(index, key, e.target.value)
                }
                placeholder="Price"
                className="w-1/2 border rounded px-2 py-1"
              />
              <button
                type="button"
                onClick={() => removeSizeField(key)}
                className="text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSizeField}
            className="text-sm text-blue-600 underline"
          >
            + Add Price Field
          </button>
        </div>
        <input
          type="text"
          name="style"
          value={form.style}
          onChange={handleChange}
          placeholder="Style (e.g. row-start or col-start)"
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
        <div className="flex justify-between pt-3">
          <button
            type="button"
            onClick={() => router.push("/admin/madeToOrders")}
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
