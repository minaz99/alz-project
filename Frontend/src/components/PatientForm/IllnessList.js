import {
  CheckIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useState } from "react";

function IllnessList(props) {
  const [clickedOn, setClickedOn] = useState(false);
  const [clickedOn1, setClickedOn1] = useState(false);
  const [clickedOn2, setClickedOn2] = useState(false);
  const [clickedOn3, setClickedOn3] = useState(false);
  const [clickedOn4, setClickedOn4] = useState(false);
  //Mixed Dementia
  // Parkinson Disease
  // Vascular (Post Stroke)
  // Alzheimer

  return (
    <div className="bg-violet-200   z-10 rounded-md ">
      <div className="">
        <div className="p-2">
          <MinusCircleIcon
            className="w-6 h-6 cursor-pointer float-right"
            color="gray"
            onClick={() => props.setShowIllnessList(false)}
          />
        </div>
        <div className="flex-col pt-4">
          <div className="flex">
            <div
              onClick={() => {
                setClickedOn(true);
                props.addDisease("Vascular Dementia");
              }}
              className=" text-gray-500 text-lg flex mx-auto items-center cursor-pointer hover:text-violet-500"
            >
              Vascular Dementia
              {clickedOn ? (
                <CheckIcon className="w-6 h-6 mx-2" color="green" />
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="flex">
            <div
              onClick={() => {
                setClickedOn1(true);
                props.addDisease("Mixed Dementia");
              }}
              className=" text-gray-500 text-lg flex mx-auto items-center cursor-pointer hover:text-violet-500"
            >
              Mixed Dementia
              {clickedOn1 ? (
                <CheckIcon className="w-6 h-6 mx-2" color="green" />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="flex">
            <div
              onClick={() => {
                setClickedOn2(true);
                props.addDisease("Parkinson Disease");
              }}
              className=" text-gray-500 text-lg flex mx-auto items-center cursor-pointer hover:text-violet-500"
            >
              Parkinson Disease
              {clickedOn2 ? (
                <CheckIcon className="w-6 h-6 mx-2" color="green" />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="flex">
            <div
              onClick={() => {
                setClickedOn3(true);
                props.addDisease("Vascular (Post Stroke)");
              }}
              className=" text-gray-500 text-lg flex mx-auto items-center cursor-pointer hover:text-violet-500"
            >
              Vascular (Post Stroke)
              {clickedOn3 ? (
                <CheckIcon className="w-6 h-6 mx-2" color="green" />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="flex">
            <div
              onClick={() => {
                setClickedOn4(true);
                props.addDisease("Alzheimer");
              }}
              className=" text-gray-500 text-lg flex mx-auto items-center cursor-pointer hover:text-violet-500"
            >
              Alzheimer
              {clickedOn4 ? (
                <CheckIcon className="w-6 h-6 mx-2" color="green" />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IllnessList;
