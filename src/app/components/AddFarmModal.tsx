import React, { useState } from "react";

type Props = {
  farmerId: string;
  show: boolean;
  onClose: () => void;
};

const AddFarmModal = (props: Props) => {
  const [area, setArea] = useState(0);
  const [village, setVillage] = useState("");
  const [cropGrown, setCropGrown] = useState("");
  const [sowingDate, setSowingDate] = useState("");
  const [country, setCountry] = useState("");

  if (!props.show) return null;

  const handleSave = () => {
    if (!area || !village || !country) {
      alert("All fields are required");
      return;
    }
    
    fetch(process.env.API_URL + "/addFarm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        area,
        village,
        cropGrown,
        sowingDate,
        country,
        farmerId: props.farmerId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          alert("Farm added successfully");
          props.onClose();
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className=" z-50 fixed w-full h-full top-0 left-0 variant-glass-surface flex items-center justify-center">
      <div className="card p-4">
        <label className="label mt-2">
          <span>Crop Grown</span>
          <input
            className="input"
            type="text"
            placeholder="Crop Grown"
            onChange={(e) => setCropGrown(e.target.value)}
          />
        </label>
        <label className="label mt-2">
          <span>Sowing Date</span>
          <input
            className="input"
            type="date"
            placeholder="Sowing Date"
            onChange={(e) => setSowingDate(e.target.value)}
          />
        </label>
        <label className="label mt-2">
          <span>Area</span>
          <input
            className="input"
            type="number"
            placeholder="Area"
            onChange={(e) => setArea(parseFloat(e.target.value))}
          />
        </label>
        <label className="label mt-2">
          <span>Village</span>
          <input
            className="input"
            type="text"
            placeholder="Village"
            onChange={(e) => setVillage(e.target.value)}
          />
        </label>
        <label className="label mt-2">
          <span>Country</span>
          <input
            className="input"
            type="text"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="btn variant-ringed"
            onClick={props.onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn variant-filled"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFarmModal;
