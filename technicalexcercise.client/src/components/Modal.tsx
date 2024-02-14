import { useState } from "react";

import CarePlanForm from "./CarePlanForm";

import { dataValidator } from "../utils/CarePlanDataValidator";
import { confirmPopUp } from "../utils/ConfirmPopUp";

import type { FieldError } from "../types/FieldError";
import type { CarePlan } from "../types/CarePlan";
import type { ActiveCarePlan } from "../types/ActiveCarePlan";

const Modal = ({
  isOpen,
  onClose,
  carePlans,
  setCarePlans,
  setActiveCarePlan,
}: {
  isOpen: boolean;
  onClose: () => void;
  carePlans: CarePlan[];
  setCarePlans: (arr: CarePlan[]) => void;
  setActiveCarePlan: (obj: ActiveCarePlan) => void;
}) => {
  const emptyCarePlan = {
    title: "",
    patientName: "",
    userName: "",
    actualStartDateTime: "",
    targetStartDateTime: "",
    reason: "",
    action: "",
    completed: false,
    endDateTime: "",
    outcome: "",
  };

  const [newCarePlanDetails, setNewCarePlanDetails] =
    useState<ActiveCarePlan>(emptyCarePlan);

  const fieldErrorsDefault = {
    title: null,
    patientName: null,
    userName: null,
    actualStartDateTime: null,
    targetStartDateTime: null,
    reason: null,
    action: null,
    completed: null,
    endDateTime: null,
    outcome: null,
  };

  const [errorDetails, setErrorDetails] =
    useState<FieldError>(fieldErrorsDefault);

  const saveCarePlanHandler = async (e: any) => {
    e.preventDefault();

    if (confirmPopUp("Are you sure you want to create this Care Plan?")) {
      // yes
      try {
        // reset the field errors
        setErrorDetails(fieldErrorsDefault);

        // get data from the form
        const data = newCarePlanDetails;

        if (
          (data.endDateTime === null || data.endDateTime === "") &&
          data.endDateTime !== undefined
        ) {
          delete data.endDateTime;
        }

        if (
          (data.outcome === null || data.outcome === "") &&
          data.outcome !== undefined
        ) {
          delete data.outcome;
        }

        if (typeof data.completed === "string") {
          delete data.completed;
        }

        // validate the data against the types
        const validatedData = dataValidator.safeParse(data);

        console.log("validated data");
        console.log(validatedData);

        if (validatedData.success) {
          console.log("in the success");
          // call the api
          const response = await fetch(`api/careplan`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedData.data),
          });

          console.log(response);

          // check if we get a 201
          if (response.status !== 201) {
            throw new Error("Unsuccessful response from the API");
          }

          const responseBody = await response.json();
          console.log(responseBody);

          console.log(carePlans);
          // update the main careplan state
          setCarePlans([...carePlans, responseBody]);

          // update the active careplan state
          setActiveCarePlan(responseBody);

          // reset the values for the modal
          modalClose();
        } else {
          console.log(validatedData.error.errors);
          let fieldErrorCopy = { ...errorDetails };
          validatedData.error.errors.forEach((error) => {
            fieldErrorCopy[error.path[0]] = error.message;
          });

          setErrorDetails(fieldErrorCopy);
        }
      } catch (error) {
        // catch the error
        console.log(error);
      }
    }
  };

  const modalClose = () => {
    onClose();
    setNewCarePlanDetails(emptyCarePlan);
    setErrorDetails(fieldErrorsDefault);
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto h-full ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="flex items-center justify-center min-h-screen h-full">
        <div className="z-50 bg-white flex flex-col justify-between text-black p-8 rounded-lg shadow-lg w-4/6 h-4/5 max-h-4/5">
          <div className="overflow-y-scroll">
            <CarePlanForm
              currentCarePlanDetails={newCarePlanDetails}
              setCurrentCarePlanDetails={setNewCarePlanDetails}
              fieldErrors={errorDetails}
            />
          </div>
          <div className="w-full flex gap-x-2 justify-end">
            <button
              onClick={modalClose}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
            <button
              onClick={saveCarePlanHandler}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
