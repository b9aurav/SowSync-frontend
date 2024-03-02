"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

type Props = {};

const Farm = (props: Props) => {
  const [farms, setFarms] = useState({});

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
      <NavBar />
      <div className="w-screen max-h-[90%] flex p-4 flex-col items-center mt-16 ">
        <button type="button" className="btn variant-filled m-2">
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
                      <td>{farm.cropGrown}</td>
                      <td>{farm.sowingDate.split("T")[0]}</td>
                      <td>{farm.area}</td>
                      <td>{farm.village}</td>
                      <td>{farm.country}</td>
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
                            onClick={() => handleDelete(farm.id)}
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

export default Farm;
