"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { MdDelete, MdEdit } from "react-icons/md";

type Props = {};

const Schedule = (props: Props) => {
  const [schedules, setSchedules] = useState({});

  useEffect(() => {
    fetch(process.env.API_URL + "/getSchedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setSchedules(data))
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
                <td>Days after Sowing</td>
                <td>Fertiliser</td>
                <td>Quantity</td>
                <td>Quantity Unit</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
            {Object.values(schedules as {[key: string]: any}).map((schedule: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{schedule.daysAfterSowing}</td>
                    <td>{schedule.fertiliser}</td>
                    <td>{schedule.quantity}</td>
                    <td>{schedule.quantityUnit}</td>
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

export default Schedule;
