"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { MdDelete, MdEdit } from "react-icons/md";

type Props = {};

const Farmer = (props: Props) => {
  const [farms, setFarms] = useState({});

  useEffect(() => {
    fetch(process.env.API_URL + "/getFarms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFarms(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <main className="w-screen h-screen">
      <NavBar />
      <div className="w-screen h-screen flex justify-center items-center p-4">
        <div className="table-container border border-[#2b334c] max-h-[80%]">
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
            {Object.values(farms as {[key: string]: any}).map((farm: any, index: number) => {
              console.log(farm);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{farm.cropGrown}</td>
                    <td>{farm.sowingDate.split('T')[0]}</td>
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
                      >
                        <MdDelete />
                      </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Farmer;
