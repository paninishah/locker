import { useState } from "react";
import ImageModal from "./ImageModal";
import "./Gallery.css";

export default function Gallery({ images }) {
  const [activeImage, setActiveImage] = useState(null);

  if (!images || images.length === 0) {
    return <p className="gallery-empty">No images yet.</p>;
  }

  return (
    <>
      <h2 className="gallery-title">Gallery</h2>

      <div className="gallery-grid">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="event"
            onClick={() => setActiveImage(img)}
          />
        ))}
      </div>

      {activeImage && (
        <ImageModal
          image={activeImage}
          onClose={() => setActiveImage(null)}
        />
      )}
    </>
  );
}
