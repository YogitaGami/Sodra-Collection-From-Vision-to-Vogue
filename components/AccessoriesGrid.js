import React from "react";
import Link from "next/link";
import DriveImage from "@/components/DriveImage";

const AccessoriesGrid = ({ images }) => {
  return (
    <div className="w-full sm:pl-12 pl-2 grid grid-cols-2 md:grid-cols-custom grid-rows-4 md:grid-rows-custom gap-6 md:gap-12">
      {images?.map((item, index) => {
        let extraClasses = "";

        if (index === 0) {
          extraClasses =
            "row-start-1 row-span-2 col-start-1 md:h-[330px] md:w-[240px] aspect-[3/4]";
        } else if (index === 1) {
          extraClasses =
            "row-start-2 row-span-2 col-start-2 md:row-start-2 md:col-start-3 md:h-[350px] md:w-[250px] aspect-[3/4]";
        } else if (index === 2) {
          extraClasses =
            "row-start-3 row-span-2 col-start-1 md:col-start-2 md:h-[250px] md:w-[220px] aspect-[3/4]";
        }

        return (
          <Link
            key={item._id}
            href={`/Accessory/${item._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-md overflow-hidden ${extraClasses}`}
          >
            <DriveImage
              imageId={item.imageId?.[0]}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default AccessoriesGrid;
