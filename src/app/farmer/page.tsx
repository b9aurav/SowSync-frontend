"use client";
import React, { use, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { MdDelete, MdEdit } from "react-icons/md";

type Props = {};

const Farmer = (props: Props) => {
  const [farmers, setFarmers] = useState({});

  useEffect(() => {
    fetch(process.env.API_URL + "/getFarmers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFarmers(data))
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
                <td>Name</td>
                <td>Phone</td>
                <td>Language</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
            {Object.values(farmers as {[key: string]: any}).map((farmer: any, index: number) => {
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
