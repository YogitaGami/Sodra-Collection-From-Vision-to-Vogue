import { useState } from "react";

export default function DriveImage({
  imageId,
  alt = "Drive Image",
  className = "",
  referrerPolicy = "no-referrer",
  width, // optional
  height, // optional
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const showFallback = error || !imageId;

  if (showFallback) {
    return (
      <div
        className={`flex items-center justify-center text-sm text-gray-500 bg-gray-200 rounded ${className}`}
        style={width || height ? { width, height } : undefined}
      >
        No Image
      </div>
    );
  }

  const imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`;

  return (
    <div
      className={`relative overflow-hidden rounded-md w-fit ${
        !width && !height ? "aspect-[3/4]" : ""
      }`}
      style={width || height ? { width, height } : undefined}
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
