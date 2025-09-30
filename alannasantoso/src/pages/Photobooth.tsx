import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";

// Components
const FilterSelect = ({ filter, setFilter }: { filter: string; setFilter: (f: string) => void }) => {
  const filters = ["none", "grayscale(100%)", "sepia(80%)", "invert(100%)"];
  return (
    <div className="mb-4">
      <label className="mr-2 font-semibold">Filter:</label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded px-2 py-1"
      >
        {filters.map((f) => (
          <option key={f} value={f}>
            {f.replace(/\(.*\)/, "")}
          </option>
        ))}
      </select>
    </div>
  );
};

const GalleryItem = ({ url, caption, filter }: { url: string; caption: string; filter: string }) => (
  <div className="border rounded p-2">
    <img src={url} style={{ filter }} className="w-full rounded" />
    <p className="mt-2 text-center">{caption}</p>
  </div>
);

export default function Photobooth() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState("none");
  const [caption, setCaption] = useState("");
  const [gallery, setGallery] = useState<
    { url: string; caption: string; filter: string }[]
  >([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Page title
  useEffect(() => {
    document.title = "photobooth | alannasantoso";
  }, []);

  // Start camera
  useEffect(() => {
    async function startCamera() {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      }
    }
    startCamera();
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    ctx.filter = filter;
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    const dataUrl = canvasRef.current.toDataURL("image/jpeg");
    setCapturedImage(dataUrl);
  };

    const handleUpload = async () => {
    if (!capturedImage) return;
    try {
        const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            image: capturedImage,
            caption,
            filter,
        }),
        });
        if (!res.ok) throw new Error("Upload failed");
        const newPhoto = await res.json();
        setGallery([newPhoto, ...gallery]);
        setCapturedImage(null);
        setCaption("");
        setFilter("none");
    } catch (err) {
        console.error(err);
        alert("Upload failed");
    }
    };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto flex-grow">
        <div className="min-h-screen mx-auto w-screen md:min-w-[800px] md:w-[50%] pt-12 pl-10 md:pl-20 pr-10 md:pr-20 mb-30">
          <p className="text-3xl font-[dm_sans]">photobooth:</p>
          <p className="mt-5 mb-8 text-sm italic">
            take a photo, add a filter & caption, and see it in the gallery below.
          </p>

          {/* Camera / Capture */}
          {!capturedImage ? (
            <div className="relative">
              <video ref={videoRef} autoPlay className="w-full rounded-lg border" />
              <button
                onClick={handleCapture}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Capture
              </button>
            </div>
          ) : (
            <div className="relative mb-4">
              <img src={capturedImage} style={{ filter }} className="w-full rounded-lg border" />
              <button
                onClick={() => setCapturedImage(null)}
                className="absolute bottom-2 left-2 bg-gray-500 text-white px-2 py-1 rounded"
              >
                Retake
              </button>
            </div>
          )}

          {capturedImage && (
            <>
              <FilterSelect filter={filter} setFilter={setFilter} />
              <input
                type="text"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="border p-2 rounded w-full mb-2"
              />
              <button
                onClick={handleUpload}
                className="bg-green-500 text-white px-4 py-2 rounded mb-6"
              >
                Upload
              </button>
            </>
          )}

          {/* Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((p, i) => (
              <GalleryItem key={i} url={p.url} caption={p.caption} filter={p.filter} />
            ))}
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </main>
    </div>
  );
}
