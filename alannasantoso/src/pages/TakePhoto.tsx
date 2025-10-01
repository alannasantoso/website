import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.js";

const FilterSelect = ({ filter, setFilter }: { filter: string; setFilter: (f: string) => void }) => {
  const filters = ["none", "grayscale(100%)", "warm(100%)"];
  return (
    <div className="mb-4 mt-3 self-start">
      <label className="mr-2 font-semibold">Filter:</label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className=" rounded px-2 py-1">
        {filters.map(f => <option key={f} value={f}>{f.replace(/\(.*\)/, "")}</option>)}
      </select>
    </div>
  );
};

export default function TakePhoto() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState("none");
  const [caption, setCaption] = useState("");

  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.title = "take photo | alannasantoso";

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
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.filter = filter;
    ctx.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
    setCapturedImage(canvasRef.current.toDataURL("image/jpeg"));
  };

const handleUpload = async () => {
  if (!capturedImage) return;

  try {
    const res = await fetch("/api/photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: capturedImage, caption, filter }),
    });

    // Read body once, handle JSON or fallback to text
    let data;
    const raw = await res.text(); // read body once
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("Server response was not JSON:", raw);
      throw new Error("Upload failed: server returned invalid response");
    }

    if (!res.ok) {
      throw new Error(data?.error || "Upload failed");
    }

    // Success
    alert("Photo uploaded!");
    setCapturedImage(null);
    setCaption("");
    setFilter("none");
    navigate("/photobooth");

  } catch (err) {
    console.error(err);
    alert(err instanceof Error ? err.message : "Upload failed");
  }
};



  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto flex-grow">
        <div className="min-h-screen mx-auto w-screen md:min-w-[800px] md:w-[50%] pt-12 pl-10 md:pl-20 pr-10 md:pr-20 mb-30">
          <p className="text-3xl font-[dm_sans] mb-10">take a photo:</p>

          {!capturedImage ? (
            <div className="relative">
              <video ref={videoRef} autoPlay className="w-full rounded-lg border" />
              <button onClick={handleCapture} className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded">
                Capture
              </button>
            </div>
          ) : (
            <div className="relative mb-4">
              <img src={capturedImage} style={{ filter }} className="w-full rounded-lg border" />
              <button
                onClick={() => window.location.reload()}
                className="absolute bottom-2 left-2 bg-gray-500 text-white px-2 py-1 rounded"
              >
                Retake
              </button>

            </div>
          )}

          {capturedImage && (
            <div className="relative flex flex-col w-full">
              <FilterSelect filter={filter} setFilter={setFilter} />
              <input type="text" placeholder="Write a caption..." value={caption} onChange={e => setCaption(e.target.value)} className="focus:outline-none border-b p-2 w-full mb-2" />
              <button onClick={handleUpload} className="bg-white mt-5 self-center hover:cursor-pointer text-black px-4 py-2 mx-auto rounded mb-6">
                add to gallery
              </button>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </main>
    </div>
  );
}
