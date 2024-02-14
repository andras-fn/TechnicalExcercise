import { useState, useEffect } from "react";

import type { CarePlan } from "../types/CarePlan";
import type { FieldError } from "../types/FieldError";
import type { ActiveCarePlan } from "../types/ActiveCarePlan";

import ContentBar from "./ContentBar";
import CarePlanForm from "./CarePlanForm";

import { dataValidator } from "../utils/CarePlanDataValidator";
import { confirmPopUp } from "../utils/ConfirmPopUp";

const ViewingArea = ({
  carePlans,
  setCarePlans,
  activeCarePlan,
  setActiveCarePlan,
}: {
  carePlans: CarePlan[];
  setCarePlans: (arr: CarePlan[]) => void;
  activeCarePlan: ActiveCarePlan;
  setActiveCarePlan: (obj: ActiveCarePlan) => void;
}) => {
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

  const [currentCarePlanDetails, setCurrentCarePlanDetails] =
    useState<ActiveCarePlan>(activeCarePlan);

  const [fieldErrors, setFieldErrors] =
    useState<FieldError>(fieldErrorsDefault);

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();

    if (confirmPopUp("Are you sure you want to update this Care Plan?")) {
      try {
        // reset the field errors
        setFieldErrors(fieldErrorsDefault);

        // get data from the form
        const data = currentCarePlanDetails;

        if (data.endDateTime === null && data.endDateTime !== undefined) {
          delete data.endDateTime;
        }

        if (data.outcome === null && data.outcome !== undefined) {
          delete data.outcome;
        }

        // validate the data against the types
        const validatedData = dataValidator.safeParse(data);

        console.log("validated data");
        console.log(validatedData);

        if (validatedData.success) {
          console.log("in the success");
          // call the api
          const response = await fetch(`api/CarePlan/${activeCarePlan.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedData.data),
          });

          console.log(response);

          // check if we get a 200
          if (response.status !== 200) {
            throw new Error("Unsuccessful response from the API");
          }

          // update the main careplan state
          setCarePlans(
            carePlans.map((carePlan: CarePlan) =>
              carePlan.id === activeCarePlan.id ? validatedData.data : carePlan
            )
          );

          // update the active careplan state
          setActiveCarePlan(await response.json());

          // reset errors
          setFieldErrors(fieldErrorsDefault);
        } else {
          console.log(validatedData.error.errors);
          let fieldErrorCopy = { ...fieldErrors };
          validatedData.error.errors.forEach((error) => {
            fieldErrorCopy[error.path[0]] = error.message;
          });

          setFieldErrors(fieldErrorCopy);
        }
      } catch (error) {
        // catch the error
        console.log(error);
      }
    }
  };

  const deleteClickHandler = async (e: any) => {
    e.preventDefault();

    if (confirmPopUp("Are you sure you want to delete this Care Plan?")) {
      try {
        // call the api
        const response = await fetch(`api/careplan/${activeCarePlan.id}`, {
          method: "DELETE",
        });

        // check if we get a 204
        if (response.status !== 204) {
          throw new Error("Unsuccessful response from the API");
        }

        // update the state
        setCarePlans(
          carePlans.filter(
            (carePlan: CarePlan) => carePlan.id !== activeCarePlan.id
          )
        );
        setActiveCarePlan({});
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setCurrentCarePlanDetails(activeCarePlan);
    setFieldErrors(fieldErrorsDefault);
  }, [activeCarePlan]);

  return (
    <div className="h-full w-full min-h-full max-h-full">
      {activeCarePlan && activeCarePlan.id && (
        <div className="h-full w-full overflow-y-scroll min-h-full max-h-full flex flex-col ">
          {/* context bar */}
          <ContentBar
            activeCarePlanId={activeCarePlan.id}
            formSubmitHandler={formSubmitHandler}
            deleteClickHandler={deleteClickHandler}
          />
          {/* form */}
          <CarePlanForm
            currentCarePlanDetails={currentCarePlanDetails}
            setCurrentCarePlanDetails={setCurrentCarePlanDetails}
            fieldErrors={fieldErrors}
          />
        </div>
      )}
    </div>
  );
};
export default ViewingArea;
