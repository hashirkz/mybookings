import React from "react";
import "./TimeDropdown.css";

function TimeDropdown({
  length1,
  selected1,
  length2,
  selected2,
  handleChange1,
  handleChange2,
}) {
  const nums1 =
    length1 == 12
      ? Array.from({ length: length1 }, (_, i) => i + 1)
      : Array.from({ length: length1 }, (_, i) => i);

  const nums2 =
    length2 == 12
      ? Array.from({ length: length2 }, (_, i) => i + 1)
      : Array.from({ length: length2 }, (_, i) => i);
  return (
    <div className="time-dropdown">
      <select value={selected1} onChange={handleChange1}>
        {nums1.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <select value={selected2} onChange={handleChange2}>
        {nums2.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TimeDropdown;
