import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Header from "../components/Header";

const GalleryItem = ({ url, caption, filter }: { url: string; caption: string; filter: string }) => (
  <div className="border bg-gray-200 aspect-7/8 rounded p-2">
    <img  src={url} style={{ filter }} className="w-full rounded aspect-6/5" />
    <p className="mt-4 text-black text-center">{caption}</p>
  </div>
);

export default function Photobooth() {
  const [gallery, setGallery] = useState<{ url: string; caption: string; filter: string }[]>([]);

  useEffect(() => {
    document.title = "photobooth | alannasantoso";

    async function fetchGallery() {
      try {
        const res = await fetch("/api/photos");
        if (!res.ok) throw new Error("Failed to fetch gallery");
        const data = await res.json();
        setGallery(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchGallery();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto flex-grow">
        <div className="min-h-screen mx-auto w-screen md:min-w-[800px] md:w-[50%] pt-12 pl-10 md:pl-20 pr-10 md:pr-20 mb-30">
          <p className="text-3xl font-[dm_sans]">photobooth:</p>
          <p className="mt-5 mb-8 text-sm italic">
            commemorate your arrival on my site! enter the booth to snap your photo 
            <Link to="/photobooth/take-photo" className="hover:italic opacity-100 font-bold "> here</Link>.

          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((p, i) => (
              <GalleryItem key={i} url={p.url} caption={p.caption} filter={p.filter} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
