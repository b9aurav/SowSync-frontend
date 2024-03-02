"use client";
import React, { use, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import AddFarmerModal from "../components/AddFarmerModal";
import AddFarmModal from "../components/AddFarmModal";
import EditFarmerModal from "../components/EditFarmerModal";

type Props = {};

const Farmer = (props: Props) => {
  const [farmers, setFarmers] = useState({});
  const [selectedFarmer, setSelectedFarmer] = useState("");
  const [showAddFarmerModal, setShowAddFarmerModal] = useState(false);
  const [showAddFarmModal, setShowAddFarmModal] = useState(false);
  const [showEditFarmerModal, setShowEditFarmerModal] = useState(false);
  const [selectedFarmerData, setSelectedFarmerData] = useState({});

  useEffect(() => {
    getFarmers();
  }, []);

  const getFarmers = () => {
    fetch(process.env.API_URL + "/getFarmers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFarmers(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this farmer? It will delete all farms and schedules associated with it!"
      )
    )
      return;

    fetch(process.env.API_URL + "/removeFarmer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          alert("Farmer deleted successfully");
          getFarmers();
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const getFarmersGrowingCrop = () => {
    fetch(process.env.API_URL + "/getFarmersGrowingCrop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFarmers(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <main className="w-screen">
      <AddFarmerModal
        show={showAddFarmerModal}
        onClose={() => setShowAddFarmerModal(false)}
        onSave={getFarmers}
      />
      <AddFarmModal
        show={showAddFarmModal}
        onClose={() => setShowAddFarmModal(false)}
        farmerId={selectedFarmer}
      />
      <EditFarmerModal
        show={showEditFarmerModal}
        data={selectedFarmerData}
        onClose={() => setShowEditFarmerModal(false)}
        onSave={getFarmers}
      />
      <NavBar />
      <div className="w-screen max-h-[90%] flex p-4 flex-col items-center mt-16 ">
        <button
          type="button"
          className="btn variant-filled mb-4"
          onClick={() => setShowAddFarmerModal(true)}
        >
          <span>
            <MdAdd />
          </span>
          <span>Add</span>
        </button>
        <label className="flex items-center space-x-2 mb-4">
          <input className="checkbox" type="checkbox" onClick={(e) => {e.currentTarget.checked ? getFarmersGrowingCrop() : getFarmers()}}/>
          <p>Farmers growing crops</p>
        </label>
        <div className="table-container border border-[#2b334c] ">
          <table className="table table-hover">
            <thead>
              <tr>
                <td>#</td>
                <td>Farmer ID</td>
                <td>Name</td>
                <td>Phone</td>
                <td>Language</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {Object.values(farmers as { [key: string]: any }).map(
                (farmer: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{farmer.id}</td>
                      <td>{farmer.name}</td>
                      <td>{farmer.phoneNumber}</td>
                      <td>{farmer.language}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="btn-icon variant-filled btn-sm"
                            onClick={() => {
                              setSelectedFarmerData(farmer);
                              setShowEditFarmerModal(true);
                            }}
                          >
                            <MdEdit />
                          </button>
                          <button
                            type="button"
                            className="btn-icon variant-filled btn-sm"
                            onClick={() => handleDelete(farmer.id)}
                          >
                            <MdDelete />
                          </button>
                          <button
                            type="button"
                            className="btn variant-filled"
                            onClick={() => {
                              setSelectedFarmer(farmer.id);
                              setShowAddFarmModal(true);
                            }}
                          >
                            <span>
                              <MdAdd />
                            </span>
                            <span>Farm</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Farmer;
