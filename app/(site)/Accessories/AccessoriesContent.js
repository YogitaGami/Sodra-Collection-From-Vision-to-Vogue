"use client";
import React, { useState, useEffect } from "react";
import AccessoriesHeadings from "@/components/AccessoriesHeadings";
import AccessoriesGrid from "@/components/AccessoriesGrid";
import axios from "axios";
import PageLoader from "@/components/PageLoader";
import { toast } from "react-toastify";

const AccessoriesContent = () => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const res = await axios.get("/api/accessory");
        setAccessories(res.data);
      } catch (err) {
        toast.error("Failed to fetch accessories. Please try again.");
        console.error("Error fetching accessories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  if (loading) return <PageLoader />;

  const getSectionData = (startIndex) => {
    const items = accessories.slice(startIndex, startIndex + 3);
    const title = items[0]?.name || "";
    const desc = items.map((item) => item.desc).join(" ");
    return { items, title, desc };
  };

  const section1 = getSectionData(0);
  const section2 = getSectionData(3);
  const section3 = getSectionData(6);
  const section4 = getSectionData(9);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-8 lg:px-16">
      {/* Section 1 */}
      {section1.items.length === 3 && (
        <section className="flex flex-col lg:flex-row mt-5">
          <div className="mt-8 sm:mt-16 lg:w-2/3">
            <AccessoriesHeadings title={section1.title} desc={section1.desc} />
          </div>
          <div className="lg:w-2/3 lg:mr-16">
            <AccessoriesGrid images={section1.items} />
          </div>
        </section>
      )}

      {/* Section 2 + Section 3 */}
      {section2.items.length === 3 && section3.items.length === 3 && (
        <section className="flex flex-col lg:flex-row gap-12 mt-20">
          <div className="flex flex-col gap-6 lg:w-1/2">
            <AccessoriesGrid images={section2.items} />
            <AccessoriesHeadings title={section2.title} desc={section2.desc} />
          </div>
          <div className="flex flex-col gap-6 lg:w-1/2">
            <AccessoriesHeadings title={section3.title} desc={section3.desc} />
            <AccessoriesGrid images={section3.items} />
          </div>
        </section>
      )}

      {/* Section 4 */}
      {section4.items.length === 3 && (
        <section className="flex flex-col lg:flex-row gap-12 mt-20">
          <div className="lg:w-2/3">
            <AccessoriesGrid images={section4.items} />
          </div>
          <div className="lg:mt-16 lg:w-2/3">
            <AccessoriesHeadings title={section4.title} desc={section4.desc} />
          </div>
        </section>
      )}
    </div>
  );
};

export default AccessoriesContent;
