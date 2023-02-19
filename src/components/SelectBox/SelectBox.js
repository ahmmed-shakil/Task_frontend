import React, { useEffect, useState } from "react";
import "./SelectBox.css";

const SelectBox = ({ setSectors, value }) => {
  const [sectors1, setSectors1] = useState([]);

  // Fetch sectors data
  const url = "http://localhost:5000/api/v1/sectors";
  const fetchData = async (url) => {
    const results = await fetch(url);
    const data = await results.json();
    const sector = await data.data;
    setSectors1(sector);
  };
  useEffect(() => {
    fetchData(url);
  }, []);
  const seletionHandle = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSectors(selectedOptions);
  };

  return (
    <>
      {/* Select Input */}
      <label
        style={{ marginRight: "10px", marginBottom: "10px" }}
        for="sectors"
      >
        Sectors:
      </label>
      <select
        onChange={seletionHandle}
        name="sectors"
        id="sectors"
        multiple
        size={10}
        value={value}
        required
      >
        {sectors1.map((option, index) => (
          <optgroup label={option.label} key={index}>
            {option.children.map((opt) => (
              <>
                <option value={opt.label}>{opt.label}</option>
                {opt.children &&
                  opt.children.map((item) => (
                    <option className="indent">
                      &nbsp;&nbsp;&nbsp;{item.label}
                    </option>
                  ))}
              </>
            ))}
          </optgroup>
        ))}
      </select>
    </>
  );
};

export default SelectBox;
