"use client";
import React, { useState, useEffect } from "react";
import AccessoriesHeadings from "@/components/AccessoriesHeadings";
import AccessoriesGrid from "@/components/AccessoriesGrid";
import axios from "axios";
import PageLoader from "@/components/PageLoader";

const AccessoriesContent = () => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchAccessories = async () => {
      try {
        const res = await axios.get("/api/accessory");
        setAccessories(res.data);
      } catch (err) {
        toast.info("Failed to fetch accessories. Please try again.")
        console.error("Error fetching accessories:",err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  if (loading) return <PageLoader />;

  // Helper function to get section content
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
    <div className="py-20 px-16">

      {section1.items.length === 3 && (
        <section className="section1 flex flex-row mt-5">
          <div className="mt-16 w-[32%] mx-44">
            <AccessoriesHeadings title={section1.title} desc={section1.desc} />
          </div>
          <AccessoriesGrid images={section1.items} />
        </section>
      )}

      {section2.items.length === 3 && section3.items.length === 3 && (
        <section className="section2 flex flex-row mt-24 gap-48">
          <div className="w-[44%]">
            <AccessoriesGrid images={section2.items} />
            <AccessoriesHeadings title={section2.title} desc={section2.desc} />
          </div>
          <div className="w-[44%]">
            <AccessoriesHeadings title={section3.title} desc={section3.desc} />
            <AccessoriesGrid images={section3.items} />
          </div>
        </section>
      )}

      {section4.items.length === 3 && (
        <section className="section3 flex flex-row mt-24">
          <AccessoriesGrid images={section4.items} />
          <div className="mt-16 w-[32%] mx-44">
            <AccessoriesHeadings title={section4.title} desc={section4.desc} />
          </div>
        </section>
      )}
    </div>
  );
};

export default AccessoriesContent;
