import { useRef, useState } from "react";
import DriveImage from "@/components/DriveImage";

const ZoomableImage = ({ imageId, alt, className }) => {
  const containerRef = useRef(null);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  const handleMouseLeave = () => {
    setOrigin({ x: 50, y: 50 }); // reset to center
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block max-w-full max-h-[90vh] overflow-hidden relative"
    >
      <div
        className="transition-transform duration-300 ease-in-out hover:scale-150"
        style={{
          transformOrigin: `${origin.x}% ${origin.y}%`,
        }}
      >
        <DriveImage
          imageId={imageId}
          alt={alt}
          className={`h-auto w-auto max-w-full max-h-[70vh] object-contain ${className}`}
        />
      </div>
    </div>
  );
};

export default ZoomableImage;
