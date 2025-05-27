"use client";

import { useState, useEffect } from "react";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

export default function MadetoOrderSubmissionsPage() {
  const [customDress, setCustomDress] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customDressMap, setCustomDressMap] = useState({});

  async function fetchCustomDress() {
    setLoading(true);
    try {
      const res = await fetch("/api/madeToOrderSubmission");
      const data = await res.json();
      setCustomDress(data);
      setFiltered(data);
    } catch (error) {
      toast.info("Failed to fetch Made-to-Order Submissions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomDress();
  }, []);

  useEffect(() => {
  if (!search?.trim()) {
    setFiltered(customDress);
    return;
  }

  const searchLower = search.toLowerCase();

  const filteredData = customDress.filter((item) => {
    const fieldsToSearch = [
      item.user?.name,
      item.user?.email,
      item.referenceId,
      item.length,
      item.chest,
      item.waist,
      item.hips,
      item.sleeve,
      item.shoulder,
      item.changes,
    ];

    return fieldsToSearch
      .filter(Boolean)
      .some((field) => field.toString().toLowerCase().includes(searchLower));
  });

  setFiltered(filteredData);
}, [search, customDress]);


  useEffect(() => {
  const fetchProducts = async () => {
    const uniqueIds = [...new Set(customDress.map((s) => s.referenceId))];
    const tempMap = {};

    await Promise.all(
      uniqueIds.map(async (id) => {
        try {
          const res = await fetch(`/api/madeToOrder/${id}`);
          const data = await res.json();
          tempMap[id] = data;
        } catch (error) {
          console.error(`Failed to fetch product ${id}`, error);
        }
      })
    );

    setCustomDressMap(tempMap);
  };

  if (customDress.length > 0) {
    fetchProducts();
  }
}, [customDress]);



  if (loading) return <PageLoader />;

  async function handleDelete(id) {
    setLoading(true);
    if (!confirm("Are you sure to delete this madeToOrderSubmission?")) return;
    try {
      const res = await fetch(`/api/madeToOrderSubmission/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.info("Deleted successfully");
        fetchCustomDress();
      } else {
        toast.info("Delete failed");
      }
    } catch {
      toast.info("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Custom-Made-Dresses Admin Panel
      </h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name, type or category..."
          className="border rounded px-4 py-2 w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No made-To-Orders found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-2 py-1">User Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Reference ID</th>
              <th className="border px-2 py-1">Length</th>
              <th className="border px-2 py-1">Chest</th>
              <th className="border px-2 py-1">Waist</th>
              <th className="border px-2 py-1">Hips</th>
              <th className="border px-2 py-1">Sleeve</th>
              <th className="border px-2 py-1">Shoulder</th>
              <th className="border px-2 py-1">Changes</th>
              <th className="border px-2 py-1">Submitted At</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customDress.map((submission) => (
              <tr key={submission._id}>
                <td className="border px-2 py-1">
                  {submission.userInfo?.name}
                </td>
                <td className="border px-2 py-1">
                  {submission.userInfo?.email}
                </td>
                <td className="border px-2 py-1">
                  {customDressMap[submission.referenceId] ? (
                    <a
                      href={`/Admin/madeToOrders/${submission.referenceId}/edit`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {customDressMap[submission.referenceId].name}
                    </a>
                  ) : (
                    submission.referenceId
                  )}
                </td>

                <td className="border px-2 py-1">
                  {submission.measurement?.length}
                </td>
                <td className="border px-2 py-1">
                  {submission.measurement?.chest}
                </td>
                <td className="border px-2 py-1">
                  {submission.measurement?.waist}
                </td>
                <td className="border px-2 py-1">
                  {submission.measurement?.hips}
                </td>
                <td className="border px-2 py-1">
                  {submission.measurement?.sleeve}
                </td>
                <td className="border px-2 py-1">
                  {submission.measurement?.shoulder}
                </td>
                <td className="border px-2 py-1">{submission.changes}</td>
                <td className="border px-2 py-1">
                  {new Date(submission.createdAt).toLocaleString()}
                </td>
                <td className="border px-2 py-1 space-x-2 whitespace-nowrap">
                  <a
                    href={`/Admin/madeToOrderSubmissions/${submission._id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(submission._id)}
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
    </div>
  );
}
