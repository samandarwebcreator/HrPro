import React from "react";
import { MdWorkHistory } from "react-icons/md";
import { Link } from "react-router-dom";

export default function SorterCards() {
  const arrayCards = [
    {
      id: 1,
      name: "Sotuv Agenti",
      icon: <MdWorkHistory />,
    },
    {
      id: 2,
      name: "Frontend developer",
      icon: <MdWorkHistory />,
    },
    {
      id: 3,
      name: "HR manager",
      icon: <MdWorkHistory />,
    },
    {
      id: 4,
      name: "Marketolog",
      icon: <MdWorkHistory />,
    },
    {
      id: 5,
      name: "Temirchi",
      icon: <MdWorkHistory />,
    },
    {
      id: 6,
      name: "Mobilograf",
      icon: <MdWorkHistory />,
    },
    {
      id: 7,
      name: "Agenti",
      icon: <MdWorkHistory />,
    },
  ];
  return (
    <div className={`flex gap-3 flex-wrap`}>
      {arrayCards.map((item) => {
        const { id, icon, name } = item;

        return (
          <div
            key={id}
            className="bg-greenActiveWorks text-white px-3 py-1.5 rounded-md"
          >
            <Link
              className="flex items-center gap-2"
              to={`/dashboard/single-job/${id}`}
            >
              <span>{icon}</span>
              <p>{name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
