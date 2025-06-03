"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

const initialMeasurement = {
  length: "",
  chest: "",
  waist: "",
  hips: "",
  sleeve: "",
  shoulder: "",
};

const MeasurementForm = ({ dressId }) => {
  const { data: session, update } = useSession();
  const pathname = usePathname(); //Correct way to get the current URL in App Router
  const router = useRouter();

  const [measurement, setMeasurement] = useState(initialMeasurement);
  const [changes, setChanges] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("dressId", dressId);
  console.log("Session user ID:", session?.user?.id);
  console.log("Username:", session?.user?.name);
  console.log("Role:", session?.user?.role);


  const handleChange = (e) => {
    setMeasurement({ ...measurement, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e) => {

    setLoading(true);
    e.preventDefault();

    if (!session) {
      // This will only run when user submits the form and they're not logged in
      if (typeof window !== "undefined") {
        localStorage.setItem("prevPage", pathname);
      }
      router.push("/Login");
      return; // Prevent further execution
    }

    const allFilled = Object.values(measurement).every((val) => val > 0);
    if (!allFilled) {
      toast.info("Please enter all measurements correctly.");
      return;
    }

    const payload = {
      dressId,
      measurement,
      changes,
    };
    try {
      const res = await axios.post(`/api/madeToOrder/${dressId}`, payload, {
        withCredentials: true,
      });
      if (res.status === 201) {
        toast.info("Submitted successfully! Further conversation will take place via Gmail.");
        setMeasurement(initialMeasurement);
        setChanges("");
      }
    } catch {
      toast.info("Error submitting form.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Enter Your Measurements</h2>

      <table className="w-full border mb-4 text-left">
        <thead>
          <tr>
            <th className="border p-2">Measurement</th>
            <th className="border p-2">Inches</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(measurement).map(([key, value]) => (
            <tr key={key}>
              <td className="border p-2 capitalize">{key}</td>
              <td className="border p-2">
                <input
                  type="number"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border rounded"
                  required
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <label className="block mb-2 font-medium">Changes You Want:</label>
      <textarea
        value={changes}
        onChange={(e) => setChanges(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
        rows={4}
        placeholder="e.g., Add extra lining, shorter sleeves..."
      />

      <button
        type="submit"
        disabled={loading}
      className={`w-fit px-7 sm:px-14 py-1 sm:py-2 rounded-md shadow-md transition-all duration-300 text-white ${
        loading
          ? "bg-[#90ccf4] cursor-not-allowed"
          : "bg-[#0680d0] hover:bg-[#44b1f9]"
      }`}
    >
      {loading ? "Submitting..." : "Submit"}
      </button>

    </form>
  );
};

export default MeasurementForm;
