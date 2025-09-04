import { motion, AnimatePresence } from "framer-motion";
import { photos } from "../data/photos";
import { useState } from "react";
import Lightbox from "./Lightbox";



const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const photoVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 20,
    },
  },
  exit: { opacity: 0, scale: 0.6, y: 20, transition: { duration: 0.2 } },
};


export default function Gallery({ activeCategory }: { activeCategory?: string }) {
  const filtered = activeCategory ? photos.filter(p => p.category === activeCategory) : photos;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => setLightboxIndex(i => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextImage = () => setLightboxIndex(i => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeCategory}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((photo, index) => (
            <motion.div
              key={photo.full}
              variants={photoVariants}
              layout
              className="cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo.thumbnail}
                alt={photo.alt}
                loading="lazy"

                className={`w-full aspect-1/1 object-cover rounded-xl transition-all duration-500 ease-out group-hover:scale-105
                  blur-xl}`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        isOpen={lightboxIndex !== null}
        currentIndex={lightboxIndex ?? 0}
        photos={filtered}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </>
  );
}
