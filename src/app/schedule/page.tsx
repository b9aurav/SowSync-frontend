"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { MdDelete, MdEdit } from "react-icons/md";
import EditScheduleModal from "../components/EditScheduleModal";

type Props = {};

const Schedule = (props: Props) => {
  const [schedules, setSchedules] = useState({});
  const [showEditScheduleModal, setShowEditScheduleModal] = useState(false);
  const [selectedScheduleData, setSelectedScheduleData] = useState({});

  useEffect(() => {
    getSchedules();
  }, []);

  const getSchedules = () => {
    fetch(process.env.API_URL + "/getSchedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setSchedules(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this schedule?"))
      return;

    fetch(process.env.API_URL + "/removeSchedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          alert("Schedule deleted successfully");
          getSchedules();
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const getSchedulesDue = () => {
    fetch(process.env.API_URL + "/getSchedulesDue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setSchedules(data))
      .catch((error) => console.error("Error:", error));
  }

  return (
    <main className="w-screen">
      <EditScheduleModal
        show={showEditScheduleModal}
        data={selectedScheduleData}
        onClose={() => setShowEditScheduleModal(false)}
        onSave={getSchedules}
      />
      <NavBar />
      <div className="w-screen max-h-[90%] flex p-4 flex-col items-center mt-16 ">
        <label className="flex items-center space-x-2 mb-4">
          <input className="checkbox" type="checkbox" onClick={(e) => {e.currentTarget.checked ? getSchedulesDue() : getSchedules()}}/>
          <p>Schedules due for today/tomorrow</p>
        </label>
        <div className="table-container border border-[#2b334c] ">
          <table className="table table-hover">
            <thead>
              <tr>
                <td>#</td>
                <td>Farm ID</td>
                <td>Days after Sowing</td>
                <td>Fertiliser</td>
                <td>Quantity</td>
                <td>Quantity Unit</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {Object.values(schedules as { [key: string]: any }).map(
                (schedule: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{schedule.farmId}</td>
                      <td>{schedule.daysAfterSowing}</td>
                      <td>{schedule.fertiliser}</td>
                      <td>{schedule.quantity}</td>
                      <td>{schedule.quantityUnit}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="btn-icon variant-filled btn-sm"
                            onClick={() => {
                              setSelectedScheduleData(schedule);
                              setShowEditScheduleModal(true);
                            }}
                          >
                            <MdEdit />
                          </button>
                          <button
                            type="button"
                            className="btn-icon variant-filled btn-sm"
                            onClick={() => handleDelete(schedule.id)}
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

export default Schedule;
