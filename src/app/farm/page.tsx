"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import AddScheduleModal from "../components/AddScheduleModal";
import EditFarmModal from "../components/EditFarmModal";

type Props = {};

const Farm = (props: Props) => {
  const [farms, setFarms] = useState({});
  const [selectedFarm, setSelectedFarm] = useState("");
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showEditFarmModal, setShowEditFarmModal] = useState(false);
  const [selectedFarmData, setSelectedFarmData] = useState({});

  useEffect(() => {
    getFarms();
  }, []);

  const getFarms = () => {
    fetch(process.env.API_URL + "/getFarms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFarms(data))
      .catch((error) => console.error("Error:", error));
  }

  const handleDelete = (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this farm? It will delete all schedules associated with it!"
      )
    )
      return;

    fetch(process.env.API_URL + "/removeFarm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          alert("Farm deleted successfully");
          getFarms();
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <main className="w-screen">
      <EditFarmModal show={showEditFarmModal} data={selectedFarmData} onSave={getFarms} onClose={() => setShowEditFarmModal(false)}/>
      <AddScheduleModal show={showAddScheduleModal} farmId={selectedFarm} onClose={() => setShowAddScheduleModal(false)} />
      <NavBar />
      <div className="w-screen max-h-[90%] flex p-4 flex-col items-center mt-16 ">
        <div className="table-container border border-[#2b334c] ">
          <table className="table table-hover">
            <thead>
              <tr>
                <td>#</td>
                <td>Farm ID</td>
                <td>Farmer ID</td>
                <td>Crop Grown</td>
                <td>Sowing Date</td>
                <td>Area</td>
                <td>Village</td>
                <td>Country</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {Object.values(farms as { [key: string]: any }).map(
                (farm: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{farm.id}</td>
                      <td>{farm.farmerId}</td>
                      <td>{farm.cropGrown}</td>
                      <td>{ farm.sowingDate ? farm.sowingDate.split("T")[0] : "" }</td>
                      <td>{farm.area}</td>
                      <td>{farm.village}</td>
                      <td>{farm.country}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="btn-icon variant-filled btn-sm"
                            onClick={() => {
                              setSelectedFarmData(farm);
                              setShowEditFarmModal(true);
                            }}
                          >
                            <MdEdit />
                          </button>
                          <button
                            type="button"
                            className="btn-icon variant-filled btn-sm"
                            onClick={() => handleDelete(farm.id)}
                          >
                            <MdDelete />
                          </button>
                          <button
                            type="button"
                            className="btn variant-filled"
                            onClick={() => {
                              setSelectedFarm(farm.id);
                              setShowAddScheduleModal(true);
                            }}
                          >
                            <span>
                              <MdAdd />
                            </span>
                            <span>Schedule</span>
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

export default Farm;
