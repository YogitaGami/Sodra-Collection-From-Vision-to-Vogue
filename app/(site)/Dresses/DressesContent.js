"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";
import { toast } from "react-toastify";

const DressesContent = () => {
  const [dresses, setDresses] = useState([]);
  const [selectColor, setSelectColor] = useState(null);
  const [selectSize, setSelectSize] = useState(null);
  const [selectType, setSelectType] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);
  const [priceRange, setPriceRange] = useState(12000);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeMobileFilter, setActiveMobileFilter] = useState("Category");

  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectCategory(categoryFromUrl);
    } else {
      setSelectCategory("");
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const res = await axios.get("/api/dresses");
        setDresses(res.data);
      } catch (err) {
        toast.info("Failed to fetch dresses. Please try again.");
        console.error("Error fetching dresses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDresses();
  }, []);

  useEffect(() => {
    if (showMobileFilters) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [showMobileFilters]);

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

  const uniqueCategories = [...new Set(dresses.map((dress) => dress.category))];
  const uniqueTypes = [...new Set(dresses.map((dress) => dress.type))];
  const uniqueColors = [...new Set(dresses.map((dress) => dress.color))];
  const uniqueSizes = [...new Set(dresses.map((dress) => dress.size))];

  if (loading) return <PageLoader />;

  return (
    <div className="py-28 px-4 lg:px-8">
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-2 sm:mb-4 flex justify-end">
        <button
          className="bg-[#0499fd] text-sm sm:text-base text-white px-2 sm:px-4 py-1 sm:py-2 rounded shadow-md"
          onClick={() => setShowMobileFilters(true)}
        >
          Show Filters
        </button>
      </div>

      {/* Mobile Filter Modal */}

      {showMobileFilters && (
        <div className="fixed inset-0 z-[60] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowMobileFilters(false)}
          ></div>

          {/* Modal Layout */}
          <div className="relative bg-white mt-20 w-full h-[70vh] p-4 z-[70] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                className="text-red-600 text-2xl font-bold"
                onClick={() => setShowMobileFilters(false)}
              >
                ✕
              </button>
            </div>
            <div className="flex min-h-[60vh]">
              {/* Left Column - Tabs */}
              <div className="w-1/3 border-r pr-2 space-y-3">
                {["Category", "Type", "Color", "Size", "Price"].map(
                  (section) => (
                    <button
                      key={section}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        activeMobileFilter === section
                          ? "bg-[#0499fd] text-white"
                          : "text-gray-700 bg-gray-100"
                      }`}
                      onClick={() => setActiveMobileFilter(section)}
                    >
                      {section}
                    </button>
                  )
                )}
                <div className="pt-14 flex flex-col gap-2">
                  <button
                    className="bg-[#0499fd] text-white px-4 py-2 rounded"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    Apply
                  </button>
                  <button
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                    onClick={handleClearFilters}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Right Column - Dynamic Filter Options */}
              <div className="w-2/3 pl-4 overflow-y-auto">
                {activeMobileFilter === "Category" && (
                  <>
                    <h3 className="font-medium mb-2">Category</h3>
                    {uniqueCategories.map((category) => (
                      <label key={category} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          className="mr-3 size-4 accent-[#54b7fa]"
                          value={category}
                          checked={selectCategory === category}
                          onChange={() => handleCategorySelect(category)}
                        />
                        {category}
                      </label>
                    ))}
                  </>
                )}

                {activeMobileFilter === "Type" && (
                  <>
                    <h3 className="font-medium mb-2">Type</h3>
                    {uniqueTypes.map((type) => (
                      <label key={type} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          className="mr-3 size-4 accent-[#54b7fa]"
                          value={type}
                          checked={selectType === type}
                          onChange={() => handleTypeSelect(type)}
                        />
                        {type}
                      </label>
                    ))}
                  </>
                )}

                {activeMobileFilter === "Color" && (
                  <>
                    <h3 className="font-medium mb-2">Color</h3>
                    {uniqueColors.map((color) => (
                      <label
                        key={color}
                        className="flex items-center gap-2 mb-2"
                      >
                        <input
                          type="checkbox"
                          className="size-4 accent-[#54b7fa]"
                          value={color}
                          checked={selectColor === color}
                          onChange={() => handleColorSelect(color)}
                        />
                        <span
                          className="inline-block w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        ></span>
                        {color}
                      </label>
                    ))}
                  </>
                )}

                {activeMobileFilter === "Size" && (
                  <>
                    <h3 className="font-medium mb-2">Size</h3>
                    {uniqueSizes.map((size) => (
                      <label key={size} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          className="mr-3 size-4 accent-[#54b7fa]"
                          value={size}
                          checked={selectSize === size}
                          onChange={() => handleSizeSelect(size)}
                        />
                        {size}
                      </label>
                    ))}
                  </>
                )}

                {activeMobileFilter === "Price" && (
                  <>
                    <h3 className="font-medium mb-2">
                      Price Range: ₹0 - ₹{priceRange}
                    </h3>
                    <input
                      type="range"
                      min="0"
                      max="12000"
                      step="50"
                      value={priceRange}
                      onChange={handlePriceChange}
                      className="w-full accent-[#0499fd]"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden lg:block lg:w-1/5 border border-[#54b7fa] rounded p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Filters</h2>
            <span
              className="text-base text-[#0680d0] font-semibold cursor-pointer hover:text-[#54b7fa]"
              onClick={handleClearFilters}
            >
              Clear All
            </span>
          </div>
          {renderFilters()}
        </div>

        {/* Dresses Grid */}
        <div className="flex-1">
          <div className="grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredDresses.length > 0 ? (
              filteredDresses.map((dress) => (
                <Link
                  key={dress._id}
                  href={`/Dress/${dress._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="shadow border border-[#54b7fa] rounded overflow-hidden">
                    <div className="w-full">
                      <DriveImage
                        imageId={dress.imageId?.[0]}
                        alt={dress.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-lg font-medium">{dress.name}</h3>
                      <p className="text-[#0499fd] font-semibold">
                        ₹{dress.price?.["3"] || "N/A"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No dresses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Component to render all filters
  function renderFilters() {
    return (
      <>
        {/* Category Filter */}
        <div>
          <h3 className="font-medium">Categories</h3>
          <div className="mt-2 space-y-1 max-h-32 overflow-y-auto pr-1 custom-scroll">
            {uniqueCategories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3 size-4 accent-[#54b7fa]"
                  value={category}
                  checked={selectCategory === category}
                  onChange={() => handleCategorySelect(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <h3 className="font-medium">Types</h3>
          <div className="mt-2 space-y-1 max-h-32 overflow-y-auto pr-1 custom-scroll">
            {uniqueTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3 size-4 accent-[#54b7fa]"
                  value={type}
                  checked={selectType === type}
                  onChange={() => handleTypeSelect(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="font-medium">Price Range: ₹0 - ₹{priceRange}</h3>
          <input
            type="range"
            min="0"
            max="12000"
            step="50"
            value={priceRange}
            onChange={handlePriceChange}
            className="w-full accent-[#0499fd]"
          />
        </div>

        {/* Color Filter */}
        <div>
          <h3 className="font-medium">Colors</h3>
          <div className="mt-2 space-y-1 max-h-32 overflow-y-auto pr-1 custom-scroll">
            {uniqueColors.map((color) => (
              <label key={color} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="size-4 accent-[#54b7fa]"
                  value={color}
                  checked={selectColor === color}
                  onChange={() => handleColorSelect(color)}
                />
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                ></span>
                {color}
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div>
          <h3 className="font-medium">Sizes</h3>
          <div className="mt-2 space-y-1 max-h-32 overflow-y-auto pr-1 custom-scroll">
            {uniqueSizes.map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3 size-4 accent-[#54b7fa]"
                  value={size}
                  checked={selectSize === size}
                  onChange={() => handleSizeSelect(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default DressesContent;
