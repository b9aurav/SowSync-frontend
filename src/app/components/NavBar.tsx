import React from "react";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <div className="flex gap-2 w-full justify-center items-center p-2 variant-glass-surface rounded-b-2xl border border-[#2b334c] fixed top-0 left-0">
      <div className="btn-group variant-filled">
        <button>Farmers</button>
        <button>Farms</button>
        <button>Schedules</button>
      </div>
    </div>
  );
};

export default NavBar;
