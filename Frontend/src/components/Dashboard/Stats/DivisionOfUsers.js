import React from "react";
import { VictoryPie } from "victory";
function DivisionOfUsers(props) {
  const data = [
    { x: "Patients", y: props.patients },
    { x: "Caregivers", y: props.caregivers },
    { x: "Social workers", y: 8 },
  ];
  return (
    <div className="bg-slate-700 rounded-lg h-80 w-96 p-4">
      <h2 className="text-center text-white font-semibold">
        Division of users
      </h2>
      <VictoryPie
        className="text-white"
        height={500}
        width={500}
        padding={80}
        colorScale={["#8df2a8", "#eb642a", "#4977f5"]}
        data={data}
        style={{
          labels: {
            fill: "white",
            fontWeight: "bold",
            fontSize: "24",
            position: "fixed",
          },
        }}
      />
    </div>
  );
}

export default DivisionOfUsers;
