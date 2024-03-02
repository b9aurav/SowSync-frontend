"use client";
import React, { use, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import AddFarmerModal from "../components/AddFarmerModal";

type Props = {};

const Farmer = (props: Props) => {
  const [farmers, setFarmers] = useState({});
  const [showModal, setShowModal] = useState(false)

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

  return (
    <main className="w-screen">
      <AddFarmerModal show={showModal} onClose={() => setShowModal(false)} onSave={getFarmers}/>
      <NavBar />
      <div className="w-screen max-h-[90%] flex p-4 flex-col items-center mt-16 ">
        <button type="button" className="btn variant-filled m-2" onClick={() => setShowModal(true)}>
          <span>
            <MdAdd />
          </span>
          <span>Add</span>
        </button>
        <div className="table-container border border-[#2b334c] ">
          <table className="table table-hover">
            <thead>
              <tr>
                <td>#</td>
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
                      <td>{farmer.name}</td>
                      <td>{farmer.phoneNumber}</td>
                      <td>{farmer.language}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="btn-icon variant-filled btn-sm"
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
