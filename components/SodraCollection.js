"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Link from "next/link";
import axios from "axios";
import PageLoader from "@/components/PageLoader";
import DriveImage from "@/components/DriveImage";

const SodraCollection = () => {
  const swiperRef = useRef(null);
  const [items, setItems] = useState([]);
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, dressesRes] = await Promise.all([
          axios.get("/api/homeSwiperData"),
          axios.get("/api/dresses"),
        ]);
        setItems(itemsRes.data);
        setDresses(dressesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <PageLoader />;

  const categoryMap = {};
  dresses.forEach((item) => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = item;
    }
  });

  const uniqueCategoryItems = Object.values(categoryMap);

  const handleMouseEnter = () => {
    if (swiperRef.current?.swiper) swiperRef.current.swiper.autoplay.stop();
  };

  const handleMouseLeave = () => {
    if (swiperRef.current?.swiper) swiperRef.current.swiper.autoplay.start();
  };

  return (
    <section id="home">
      <div className="mx-auto mt-4">
        <div className="trending_items">
          {items && items.length > 0 ? (
            <Swiper
              ref={swiperRef}
              effect={"slide"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="w-full h-full "
              onSwiper={(swiper) => {
                swiperRef.current.swiper = swiper;
              }}
            >
              {items.map((item) => (
                <SwiperSlide
                  key={item._id}
                  className="relative group"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-full max-h-[90vh] lg:max-h-[65vh] sm:h-[90vh] flex flex-col-reverse sm:flex-row overflow-hidden">
                    {/* Image Section */}
                    <div className="image w-full sm:w-[60%] relative h-[50vh] sm:h-full">
                      {/* Desktop Image */}
                      <div className="hidden sm:block w-full h-full">
                        <DriveImage
                          imageId={item.imageId?.[item.imageId.length - 1]} // Desktop image
                          alt={item.name}
                          className="rounded-lg object-cover w-full h-full lg:object-top object-left-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Mobile Image */}
                      <div className="block sm:hidden w-full h-full">
                        <DriveImage
                          imageId={item.imageId?.[0]} // Mobile image (or use a different one)
                          alt={item.name}
                          className="rounded-lg object-cover w-full h-full object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Text Section */}
                    <div className="w-full sm:w-[40%] flex flex-col justify-center items-center px-4 gap-1 sm:gap-2 text-center overflow-auto max-h-full">
                      <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase">
                        {item.collectionType}
                      </h1>
                      <div className="font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl capitalize">
                        {item.type}
                      </div>
                      <div className="font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl capitalize">
                        {item.tag}
                      </div>
                      <div className="border-l-0 bg-[#54b7fa] h-[1px] w-full"></div>
                      <Link href={`/${item.collectionType}`}>
                        <div className="text-[#0680d0] text-base sm:text-xl md:text-2xl">
                          Explore
                        </div>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Pagination Styling */}
              <style jsx>{`
                .swiper-pagination-bullet {
                  width: 6px;
                  height: 6px;
                  background-color: #0180a7;
                  transition:
                    background-color 0.3s,
                    transform 0.3s;
                }
                .swiper-pagination-bullet-active {
                  background-color: #0180a7;
                  transform: scale(1.2);
                }
                .swiper-pagination-bullet:hover {
                  background-color: #013c36;
                  transform: scale(1.2);
                }
              `}</style>
            </Swiper>
          ) : (
            <p className="text-black text-center">
              No major projects available.
            </p>
          )}
        </div>
      </div>

      {/* Category Section */}
      <h1 className="p-4 sm:p-6 md:p-8 font-bold text-2xl sm:text-3xl text-center">
        Shop by Category
      </h1>
      <div className="grid max-sm:grid-cols-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 px-2 sm:px-6">
        {uniqueCategoryItems.map((item) => (
          <Link
            key={item._id}
            href={`/Dresses?category=${encodeURIComponent(item.category)}`}
          >
            <div className="category relative overflow-hidden group rounded-md shadow-lg">
              <div className="w-full ">
                <DriveImage
                  imageId={item.imageId?.[0]}
                  alt={item.name}
                  className="object-cover w-full md:aspect-[284/450] aspect-[150/200]"
                />
              </div>
              <div className="info absolute bottom-0 left-0 right-0 bg-[#71c1f6]/80 text-center p-2">
                <h2 className="text-sm sm:text-lg font-semibold">
                  {item.category}
                </h2>
                <h3 className="text-sm sm:text-base">30-20% OFF</h3>
                <button className="text-sm sm:text-base">Rent Now</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SodraCollection;
