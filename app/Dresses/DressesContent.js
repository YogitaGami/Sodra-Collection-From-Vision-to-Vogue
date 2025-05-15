"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";

const DressesContent = () => {
  const [dresses, setDresses] = useState([]);
  const [selectColor, setSelectColor] = useState(null);
  const [selectSize, setSelectSize] = useState(null);
  const [selectType, setSelectType] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);
  const [priceRange, setPriceRange] = useState(12000);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectCategory(categoryFromUrl);
    } else {
      setSelectCategory(""); // reset filter if no category in URL
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const res = await axios.get("/api/dresses");
        setDresses(res.data);
      } catch (err) {
        console.error("Error fetching dresses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDresses();
  }, []);

  if (loading) return <PageLoader />;

  const handleTypeSelect = (type) => {
    setSelectType(selectType === type ? null : type);
  };

  const handleCategorySelect = (category) => {
    setSelectCategory(selectCategory === category ? null : category);
  };

  const handleColorSelect = (color) => {
    setSelectColor(selectColor === color ? null : color);
  };
  const handleSizeSelect = (size) => {
    setSelectSize(selectSize === size ? null : size);
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  const handleClearFilters = () => {
    setSelectCategory(null);
    setSelectType(null);
    setSelectColor(null);
    setSelectSize(null);
    setPriceRange(12000);
  };

  const filteredDresses = dresses.filter((dress) => {
    return (
      (!selectCategory || dress.category === selectCategory) &&
      (!selectType || dress.type === selectType) &&
      (!selectColor || dress.color === selectColor) &&
      (!selectSize || dress.size === selectSize) &&
      dress.price?.["3"] <= priceRange
    );
  });

  // **Extract Unique Categories**
  const uniqueCategories = [...new Set(dresses.map((dress) => dress.category))];

  // **Extract Unique Types**
  const uniqueTypes = [...new Set(dresses.map((dress) => dress.type))];

  // **Extract Unique Colors**
  const uniqueColors = [...new Set(dresses.map((dress) => dress.color))];

  // **Extract Unique Size**
  const uniqueSizes = [...new Set(dresses.map((dress) => dress.size))];

  // Store mapped items in variables
  const categoryFilters = uniqueCategories.map((category) => (
    <div key={category}>
      <input
        type="checkbox"
        className="mr-3 size-4 accent-[#54b7fa]"
        name="selectCategory"
        value={category}
        checked={selectCategory === category}
        onChange={() => handleCategorySelect(category)}
      />
      {category}
    </div>
  ));

  const typeFilters = uniqueTypes.map((type) => (
    <div key={type}>
      <input
        type="checkbox"
        className="mr-3 size-4 accent-[#54b7fa]"
        name="selectType"
        value={type}
        checked={selectType === type}
        onChange={() => handleTypeSelect(type)}
      />
      {type}
    </div>
  ));

  const colorFilters = uniqueColors.map((color) => (
    <div key={color} className="flex items-center gap-1">
      <input
        type="checkbox"
        className="mr-3 size-4 accent-[#54b7fa]"
        name="selectColor"
        value={color}
        checked={selectColor === color}
        onChange={() => handleColorSelect(color)}
      />
      <div
        className="size-3 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      {color}
    </div>
  ));

  const sizeFilters = uniqueSizes.map((size) => (
    <div key={size}>
      <input
        type="checkbox"
        className="mr-3 size-4 accent-[#54b7fa]"
        name="selectSize"
        value={size}
        checked={selectSize === size}
        onChange={() => handleSizeSelect(size)}
      />
      {size}
    </div>
  ));

  return (
    <>
      <div className="py-28 flex mx-8">
        {/* Filters Section */}
        <div className="filter w-[18%]">
          <div className="heading flex justify-between items-center">
            <h2 className="font-semibold text-xl">Filters</h2>
            <span
              className="text-base text-[#0680d0] font-semibold cursor-pointer hover:text-[#54b7fa]"
              onClick={handleClearFilters}
            >
              Clear All
            </span>
          </div>

          {/* Categories Filter */}
          <div className="filter-1 category mt-3 p-4 border-[1px] border-[#54b7fa]">
            <h3>Categories</h3>
            <div className="list p-2">{categoryFilters}</div>
          </div>

          {/* Tpyes Filter */}
          <div className="filter-1 category mt-3 p-4 border-[1px] border-[#54b7fa]">
            <h3>Types</h3>
            <div className="list p-2">{typeFilters}</div>
          </div>

          {/* Price Filter */}
          <div className="filter-2 price mt-3 p-4 border-[1px] border-[#54b7fa]">
            <h3>Price Range: ₹0 - ₹{priceRange}</h3>
            <input
              type="range"
              min="0"
              max="12000"
              step="50"
              value={priceRange}
              onChange={handlePriceChange}
              className="w-full h-1 cursor-pointer accent-[#0499fd]"
            />
          </div>

          {/* Color Filter */}
          <div className="filter-3 color mt-3 p-4 border-[1px] border-[#54b7fa]">
            <h3>Colors</h3>
            <div className="list flex flex-col gap-0.5 p-2">{colorFilters}</div>
          </div>

          {/* Size Filter */}
          <div className="filter-4 size mt-3 p-4 border-[1px] border-[#54b7fa]">
            <h3>Sizes</h3>
            <div className="list p-2">{sizeFilters}</div>
          </div>
        </div>

        {/* ✅ Use mapped dresses here */}
        {/* Dresses List */}
        <div className="w-full dresses m-5 mr-0 flex gap-7 flex-wrap">
          {filteredDresses && filteredDresses.length > 0 ? (
            filteredDresses.map((dress) => (
              <div key={dress._id}>
                <Link
                  href={`/Dress/${dress._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="dress shadow border border-[#54b7fa]">
                    <DriveImage
                      imageId={dress.imageId?.[0]}
                      alt={dress.name}
                      width={284}
                      height={450}
                    />
                    <h3>{dress.name}</h3>
                    <p>₹{dress.price?.["3"] || "N/A"}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No dresses found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DressesContent;
