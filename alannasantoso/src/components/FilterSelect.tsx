import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const filters = ["none", "grayscale(100%)", "sepia(80%)", "invert(100%)"];

const FilterSelect: React.FC<Props> = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="mr-2 font-semibold">Filter:</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {filters.map((f) => (
        <option key={f} value={f}>
          {f.replace(/\(.*\)/, "")}
        </option>
      ))}
    </select>
  </div>
);

export default FilterSelect;
