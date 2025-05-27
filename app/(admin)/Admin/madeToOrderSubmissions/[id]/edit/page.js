"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import PageLoader from "@/components/PageLoader";

export default function EditMadeToOrderSubmission({ params }) {
  const { id } = params;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    userInfo: { name: "", email: "" },
    measurement: {
      length: 0,
      chest: 0,
      waist: 0,
      hips: 0,
      sleeve: 0,
      shoulder: 0,
    },
    changes: "",
  });

  useEffect(() => {
    async function fetchSubmission() {
      try {
        const res = await fetch(`/api/madeToOrderSubmission/${id}`);
        if (!res.ok) throw new Error("Failed to fetch submission data");
        const data = await res.json();
        setForm(data);
      } catch (err) {
        toast.error("Failed to fetch submission data");
      }
    }
    fetchSubmission();
  }, [id]);

  function handleMeasurementChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      measurement: {
        ...prev.measurement,
        [name]: Number(value),
      },
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/madeToOrderSubmission/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Submission updated successfully");
      router.push("/Admin/madeToOrderSubmissions");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <PageLoader />;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Made To Order Submission</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Name</label>
          <input
            type="text"
            value={form.userInfo.name}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            value={form.userInfo.email}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <fieldset className="border p-4 rounded">
          <legend className="font-semibold">Measurements</legend>
          {Object.entries(form.measurement).map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="block text-sm">{key}</label>
              <input
                type="number"
                name={key}
                value={value}
                onChange={handleMeasurementChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
        </fieldset>

        <div>
          <label className="block text-sm font-semibold">Changes Requested</label>
          <textarea
            name="changes"
            value={form.changes}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Describe any changes requested by the user"
          />
        </div>

        <div className="flex justify-between pt-3">
          <button
            type="button"
            onClick={() => router.push("/admin/madeToOrderSubmissions")}
            className="px-4 py-2 border rounded hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
