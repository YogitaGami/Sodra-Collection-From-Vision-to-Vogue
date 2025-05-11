import React from "react";
import Link from "next/link";
import DriveImage from "@/components/DriveImage";

const AccessoriesGrid = ({ images }) => {

  return (
    <div className="images w-[43%] grid grid-cols-2 grid-rows-4 md:grid-cols-custom md:grid-rows-custom gap-12">
      {images?.map((item, index) => {
        let extraClasses = "";

        if (index === 0) {
          extraClasses = "row-span-2 col-span-2 h-[330px] w-[240px]";
        } else if (index === 1) {
          extraClasses =
            "row-start-2 row-span-2 col-start-3 h-[350px] w-[250px]";
        } else if (index === 2) {
          extraClasses =
            "row-start-3 row-span-2 col-start-2 h-[250px] w-[220px]";
        }

        return (
          <Link
            key={item._id}
            href={`/Accessory/${item._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`border-[1px] ${extraClasses}`}
          >
            <DriveImage
              imageId={item.imageId?.[0]}
              alt={item.name}
              className={`object-cover w-full h-full`}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default AccessoriesGrid;
