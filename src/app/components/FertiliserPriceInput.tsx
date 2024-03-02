import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

type Props = {
  onChange: (name: string, price: number, unit: string) => void;
  onDelete: () => void;
};

const FertiliserPriceInput = (props: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("ton");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    props.onChange(e.target.value, price, unit);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
    props.onChange(name, Number(e.target.value), unit);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
    props.onChange(name, price, e.target.value);
  }

  return (
    <div className="flex gap-2">
      <label className="label mt-2">
        <span>Fertiliser Name</span>
        <input
          className="input"
          type="text"
          placeholder="Fertiliser Name"
          onChange={handleNameChange}
        />
      </label>
      <label className="label mt-2">
        <span>Price</span>
        <input
          className="input"
          type="number"
          placeholder="Price"
          onChange={handlePriceChange}
        />
      </label>
      <label className="label mt-2">
        <span>Unit</span>
        <select
            className="input"
            onChange={handleUnitChange}
          >
            <option value="ton">ton</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="L">L</option>
            <option value="ml">ml</option>
          </select>
        </label>
      <div>
        <button type="button" className="btn variant-filled mt-10" onClick={props.onDelete}>
          <span>
            <MdDelete />
          </span>
        </button>
      </div>
    </div>
  );
};

export default FertiliserPriceInput;
