import React, { useRef, useEffect } from "react";

type Props = {
  onCapture: (dataUrl: string) => void;
  filter: string;
};

const WebcamCapture: React.FC<Props> = ({ onCapture, filter }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    ctx.filter = filter;
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    const dataUrl = canvasRef.current.toDataURL("image/jpeg");
    onCapture(dataUrl);
  };

  return (
    <div className="relative">
      <video ref={videoRef} autoPlay className="w-full rounded-lg border" />
      <button
        onClick={handleCapture}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Capture
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default WebcamCapture;
