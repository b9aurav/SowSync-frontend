import React, { useState } from "react";
import FertiliserPriceInput from "./FertiliserPriceInput";
import { MdAdd } from "react-icons/md";

type Props = {
  show: boolean;
  farmerId: string;
  onClose: () => void;
};

const CalculateBillModal = (props: Props) => {
  const [fertilisers, setFertilisers] = useState<
    Array<{ id: number; name: string; price: number; unit: string }>
  >([]);

  if (!props.show) return null;

  const handleAddFertiliser = () => {
    setFertilisers([...fertilisers, { id: Date.now(), name: "", price: 0, unit: "ton" }]);
  };

  const handleFertiliserChange = (id: number, name: string, price: number, unit: string) => {
    setFertilisers((fertilisers) => {
      const newFertilisers = [...fertilisers];
      const index = newFertilisers.findIndex(
        (fertiliser) => fertiliser.id === id
      );
      newFertilisers[index] = { id, name, price, unit };
      return newFertilisers;
    });
  };

  const handleDeleteFertiliser = (id: number) => {
    setFertilisers((fertilisers) =>
      fertilisers.filter((fertiliser) => fertiliser.id !== id)
    );
  };

  const handleSave = () => {
    if (!fertilisers.length) alert("Add fertilisers to calculate bill");

    const fertiliserPrices = Object.fromEntries(
      fertilisers.map(fertiliser => [
        fertiliser.name,
        { price: fertiliser.price, unit: fertiliser.unit }
      ])
    );
    
    fetch(process.env.API_URL + "/calculateBill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        farmerId: props.farmerId,
        fertiliserPrices,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.totalCost != null) {
          alert(`Total cost: ${data.totalCost}`);
        } else {
          alert(data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className=" z-50 fixed w-full h-full top-0 left-0 variant-glass-surface flex items-center justify-center">
      <div className="card p-4">
        <div className="max-h-80 overflow-auto">
          {fertilisers.map((fertiliser) => (
            <FertiliserPriceInput
              key={fertiliser.id}
              onChange={(name, price, unit) =>
                handleFertiliserChange(fertiliser.id, name, price, unit)
              }
              onDelete={() => handleDeleteFertiliser(fertiliser.id)}
            />
          ))}
        </div>
        <button
          type="button"
          className="btn variant-filled mt-2"
          onClick={handleAddFertiliser}
        >
          <span>
            <MdAdd />
          </span>
          <span>Add Fertiliser</span>
        </button>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="btn variant-ringed"
            onClick={props.onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn variant-filled"
            onClick={handleSave}
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculateBillModal;
