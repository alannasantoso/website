import React from "react";

type Photo = {
  _id: string;
  url: string;
  caption: string;
  filter?: string;
  createdAt: string;
};

type Props = {
  photos: Photo[];
};

const BoothGallery: React.FC<Props> = ({ photos }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {photos.map((p) => (
      <div key={p._id} className="border rounded p-2">
        <img src={p.url} style={{ filter: p.filter }} className="w-full rounded" />
        <p className="mt-2 text-center">{p.caption}</p>
      </div>
    ))}
  </div>
);

export default BoothGallery;
