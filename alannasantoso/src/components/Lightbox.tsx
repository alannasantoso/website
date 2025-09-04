import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  photos: { full: string; alt: string }[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ isOpen, currentIndex, photos, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  const { full, alt } = photos[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.img
          src={full}
          alt={alt}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Navigation buttons */}
        <button
          className="absolute left-5 text-white text-3xl"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          ‹
        </button>
        <button
          className="absolute right-5 text-white text-3xl"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          ›
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default Lightbox;
