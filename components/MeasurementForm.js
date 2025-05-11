"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

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
  // const [prevPath, setPrevPath] = useState("");

  const [measurement, setMeasurement] = useState(initialMeasurement);
  const [changes, setChanges] = useState("");
  const [message, setMessage] = useState("");
  console.log("dressId", dressId);
  console.log("Session user ID:", session?.user?.id);
  console.log("Username:", session?.user?.name);
  console.log("Role:", session?.user?.role);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const handleChange = (e) => {
    setMeasurement({ ...measurement, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e) => {
    //  useEffect(() => {
    //     if (typeof window === "undefined") return; // Ensure it's running on the client

    //     console.log("Current Path:", pathname);
    //     if (!session) {
    //         localStorage.setItem("prevPage", pathname);
    //         setPrevPath(pathname);
    //         console.log("Stored Page:", pathname);
    //         router.push("/Login");
    //       }
    //     }, [session, pathname, router]);
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
      setMessage("Please enter all measurements correctly.");
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
        setMessage("Submitted successfully!");
        setMeasurement(initialMeasurement);
        setChanges("");
      }
    } catch {
      setMessage("Error submitting form.");
    }
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
        className="w-fit bg-[#0680d0] text-white px-14 py-2 rounded-md shadow-md hover:bg-[#44b1f9] transition-all duration-300"
      >
        Submit
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </form>
  );
};

export default MeasurementForm;
