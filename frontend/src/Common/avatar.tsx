import React, { useState } from "react";

// Define the props for the Avatar component
interface AvatarProps {
  src?: string; // URL of the image
  alt?: string; // Alt text for the image
  fallbackText?: string; // Text to display if the image fails to load
  className?: string; // Additional CSS classes
}

// Avatar Component
const Avatar: React.FC<AvatarProps> = ({ src, alt, fallbackText, className, children }) => {
  const [imageError, setImageError] = useState(false); // State to track image loading errors

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${
        className || ""
      }`}
    >
      {/* Avatar Image */}
      {!imageError && src && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)} // Trigger fallback on error
        />
      )}

      {/* Avatar Fallback */}
      {(!src || imageError) && (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 font-medium">
          {children || fallbackText || "AV"}
        </div>
      )}
    </div>
  );
};

// Sub-component: AvatarImage
const AvatarImage: React.FC<{ src: string; alt?: string }> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
};

// Sub-component: AvatarFallback
const AvatarFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 font-medium">
      {children}
    </div>
  );
};

// Export all components
export { Avatar, AvatarImage, AvatarFallback };