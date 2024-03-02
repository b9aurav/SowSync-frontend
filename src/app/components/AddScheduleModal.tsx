import React, { useState } from "react";

type Props = {
  farmId: string;
  show: boolean;
  onClose: () => void;
};

const AddScheduleModal = (props: Props) => {
  const [daysAfterSowing, setDaysAfterSowing] = useState(0);
  const [fertiliser, setFertiliser] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [quantityUnit, setQuantityUnit] = useState("ton");
  
  if (!props.show) return null;

  const handleSave = () => {
    if (!daysAfterSowing || !fertiliser || !quantity || !quantityUnit) {
      alert("All fields are required");
      return;
    }
    
    fetch(process.env.API_URL + "/addSchedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        daysAfterSowing,
        fertiliser,
        quantity,
        quantityUnit,
        farmId: props.farmId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          alert("Schedule added successfully");
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
          <span>Days After Sowing</span>
          <input
            className="input"
            type="number"
            placeholder="Days After Sowing"
            onChange={(e) => setDaysAfterSowing(parseInt(e.target.value))}
          />
        </label>
        <label className="label mt-2">
          <span>Fertiliser</span>
          <input
            className="input"
            type="text"
            placeholder="Fertiliser"
            onChange={(e) => setFertiliser(e.target.value)}
          />
        </label>
        <label className="label mt-2">
          <span>Quantity</span>
          <input
            className="input"
            type="number"
            placeholder="Quantity"
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
          />
        </label>
        <label className="label mt-2">
          <span>Quantity Unit</span>
          <select
            className="input"
            onChange={(e) => setQuantityUnit(e.target.value)}
          >
            <option value="ton">ton</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="L">L</option>
            <option value="ml">ml</option>
          </select>
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

export default AddScheduleModal;
