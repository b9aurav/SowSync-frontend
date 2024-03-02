import React, { useEffect, useState } from "react";

type Props = {
  show: boolean;
  data: any;
  onClose: () => void;
  onSave: () => void;
};

const EditFarmerModal = (props: Props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (props.data.name && props.data.phoneNumber && props.data.language) {
      setName(props.data.name);
      setPhone(props.data.phoneNumber);
      setLanguage(props.data.language);
    }
  }, [props.data.name, props.data.phoneNumber, props.data.language]);

  if (!props.show) return null;

  const handleSave = () => {
    if (!name || !phone || !language) {
      alert("All fields are required");
      return;
    }
    
    fetch(process.env.API_URL + "/updateFarmer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phoneNumber: phone,
        language: language,
        id: props.data.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          alert("Farmer updated successfully");
          props.onClose();
          props.onSave();
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
          <span>Name</span>
          <input
            className="input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="label mt-2">
          <span>Phone</span>
          <input
            className="input"
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="label mt-2">
          <span>Language</span>
          <input
            className="input"
            type="text"
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
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

export default EditFarmerModal;
