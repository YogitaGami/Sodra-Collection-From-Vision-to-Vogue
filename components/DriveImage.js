import { useState } from "react";

export default function DriveImage({
  imageId,
  alt = "Drive Image",
  width = "100%",
  height = "100%",
  className = "",
  referrerPolicy = "no-referrer",
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const showFallback = error || !imageId;

  if (showFallback) {
    return (
      <div
        className={`flex items-center justify-center text-sm text-gray-500 bg-gray-200 rounded ${className}`}
        style={{ width, height }}
      >
        No Image
      </div>
    );
  }

  const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`;

  return (
    <div
      className="relative overflow-hidden rounded-md"
      style={{ width, height }}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-[#8acefc96] animate-pulse" />
      )}
      <img
        src={imageUrl}
        alt={alt}
        referrerPolicy={referrerPolicy}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        loading="lazy"
      />
    </div>
  );
}
