"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
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
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <section id="home">
      <div className="container mx-auto">
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
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false, // Keep autoplay active after manual interaction
              }}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="swiper_container"
              onSwiper={(swiper) => {
                swiperRef.current.swiper = swiper; // Set swiper instance on ref
              }}
            >
              {items.map((item) => {
                return (
                  <SwiperSlide
                    key={item._id}
                    className="relative group"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Resume autoplay when hover ends */}
                    <div className="relative w-full h-96 flex flex-row gap-6">
                      <div className="image w-[70%]">
                        <DriveImage
                          imageId={item.imageId?.[item.imageId.length - 1]}
                          alt={item.name}
                          className="rounded-lg object-cover lg:object-top object-left-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="w-[50%] flex flex-col justify-center items-center px-5 gap-6">
                        <h1 className="font-bold text-6xl uppercase">
                          {item.collectionType}
                        </h1>
                        <div className="font-semibold text-4xl capitalize">
                          {item.type}
                        </div>
                        <div className="font-semibold text-4xl capitalize">
                          {item.tag}
                        </div>
                        <div className="border-l-0 bg-[#54b7fa] h-[1px] w-full"></div>
                        <Link href={`/${item.collectionType}`}>
                          <div className="text-[#0680d0] text-2xl">Explore</div>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* Custom Styling for Navigation Arrows */}
              <style jsx>{`
                /* Style the pagination dots */
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
      <h1 className="p-8 font-bold text-3xl">Shop by Category</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {uniqueCategoryItems.map((item) => (
          <Link
            key={item._id}
            href={`/Dresses?category=${encodeURIComponent(item.category)}`}
          >
            <div className="category !relative overflow-hidden">
              <DriveImage
                imageId={item.imageId?.[0]}
                alt={item.name}
                height={220}
                width={180}
              />
              <div className="info absolute bottom-2 mx-2 bg-[#71c1f6] text-center w-full">
                <h2 className="text-xl font-semibold">{item.category}</h2>
                <h3 className="text-2xl">30-20% OFF</h3>
                <button className="text-xl">Rent Now</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SodraCollection;
