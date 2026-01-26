import "./ImageModal.css";

export default function ImageModal({ image, onClose }) {
  return (
    <div className="image-modal" onClick={onClose}>
      <img src={image} alt="full view" />
    </div>
  );
}
