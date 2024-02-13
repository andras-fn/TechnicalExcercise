import { useState, useEffect } from "react";
import { z } from "zod";

import { CarePlan } from "../types/CarePlan";
import { FieldError } from "../types/FieldErrors";
import FieldErrorComponent from "./FieldErrorComponent";

const ViewingArea = ({
  carePlans,
  setCarePlans,
  activeCarePlan,
  setActiveCarePlan,
}: {
  carePlans: CarePlan[];
  setCarePlans: any;
  activeCarePlan: CarePlan;
  setActiveCarePlan: any;
}) => {
  const [currentCarePlanDetails, setCurrentCarePlanDetails] =
    useState<CarePlan>(activeCarePlan);

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

  const [fieldErrors, setFieldErrors] =
    useState<FieldError>(fieldErrorsDefault);

  const formChangeHandler = (e: any) => {
    if (e.target.type === "checkbox") {
      setCurrentCarePlanDetails({
        ...currentCarePlanDetails,
        [e.target.id]: e.target.checked,
      });
    } else {
      setCurrentCarePlanDetails({
        ...currentCarePlanDetails,
        [e.target.id]: e.target.value,
      });
    }
  };

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();

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
      const dataValidator = z.object({
        id: z.string().uuid(),
        title: z.string().min(1).max(450),
        patientName: z.string().min(1).max(450),
        userName: z.string().min(1).max(450),
        //actualStartDateTime: z.string().datetime(),
        actualStartDateTime: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/)
          .refine(
            (value) => {
              return typeof value === "string" && !isNaN(Date.parse(value));
            },
            {
              message:
                "Invalid datetime format, it should be YYYY-MM-DDTHH:MM:SS or YYYY-MM-DDTHH:MM",
            }
          ),
        targetStartDateTime: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/)
          .refine(
            (value) => {
              return typeof value === "string" && !isNaN(Date.parse(value));
            },
            {
              message:
                "Invalid datetime format, it should be YYYY-MM-DDTHH:MM:SS or YYYY-MM-DDTHH:MM",
            }
          ),
        reason: z.string().min(1).max(1000),
        action: z.string().min(1).max(1000),
        completed: z.boolean().optional(),
        endDateTime: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/)
          .refine(
            (value) => {
              return typeof value === "string" && !isNaN(Date.parse(value));
            },
            {
              message:
                "Invalid datetime format, it should be YYYY-MM-DDTHH:MM:SS or YYYY-MM-DDTHH:MM",
            }
          )
          .optional(),
        outcome: z.string().min(1).max(1000).optional(),
      });

      const validatedData = dataValidator.safeParse(data);

      console.log("validated data");
      console.log(validatedData);

      if (validatedData.success) {
        console.log("in the success");
        // call the api
        const response = await fetch(`api/careplan/${activeCarePlan.id}`, {
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
  };

  const deleteClickHandler = async (e: any) => {
    e.preventDefault();

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
          <div className="w-full p-2 bg-slate-300 flex justify-between items-center border-b border-slate-500">
            <div className="flex gap-x-2">
              <span className="font-bold">Patient ID:</span>
              <span>{activeCarePlan.id}</span>
            </div>
            <div className="flex gap-x-2">
              <button
                className="py-2 px-4 bg-green-500 rounded text-white hover:bg-green-700"
                onClick={formSubmitHandler}
              >
                Save
              </button>
              <button
                className="py-2 px-4 rounded bg-red-500 hover:bg-red-700 text-white"
                onClick={deleteClickHandler}
              >
                Delete
              </button>
            </div>
          </div>
          {/* form */}
          <form className="flex flex-col gap-y-3 p-2 w-[500px] text-s text-slate-700 mx-auto">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <label>Patient Title</label>
                <input
                  type="text"
                  value={currentCarePlanDetails.title}
                  id="title"
                  onChange={formChangeHandler}
                />
                <FieldErrorComponent field={fieldErrors.title} />
              </div>
              <div className="flex flex-col">
                <label>Patient Name</label>
                <input
                  type="text"
                  value={currentCarePlanDetails.patientName}
                  id="patientName"
                  onChange={formChangeHandler}
                />
                <FieldErrorComponent field={fieldErrors.patientName} />
              </div>
            </div>
            <div className="flex flex-col">
              <label>Created By</label>
              <input
                type="text"
                value={currentCarePlanDetails.userName}
                id="userName"
                onChange={formChangeHandler}
              />
              <FieldErrorComponent field={fieldErrors.userName} />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <label>Target Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={currentCarePlanDetails.targetStartDateTime}
                  id="targetStartDateTime"
                  onChange={formChangeHandler}
                />
                <FieldErrorComponent field={fieldErrors.targetStartDateTime} />
              </div>
              <div className="flex flex-col">
                <label>Actual Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={currentCarePlanDetails.actualStartDateTime}
                  id="actualStartDateTime"
                  onChange={formChangeHandler}
                />
                <FieldErrorComponent field={fieldErrors.actualStartDateTime} />
              </div>
            </div>
            <div className="flex flex-col">
              <label>Reason</label>
              <textarea
                value={currentCarePlanDetails.reason}
                id="reason"
                onChange={formChangeHandler}
              />
              <FieldErrorComponent field={fieldErrors.reason} />
            </div>
            <div className="flex flex-col">
              <label>Action</label>
              <textarea
                value={currentCarePlanDetails.action}
                id="action"
                onChange={formChangeHandler}
              />
              <FieldErrorComponent field={fieldErrors.action} />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-x-2 items-center">
                <input
                  type="checkbox"
                  checked={currentCarePlanDetails.completed}
                  id="completed"
                  onChange={formChangeHandler}
                />
                <label>Completed</label>
              </div>
              <FieldErrorComponent field={fieldErrors.completed} />
            </div>

            <div className="flex flex-col">
              <label>End Date & Time</label>
              <input
                type="datetime-local"
                value={
                  currentCarePlanDetails.endDateTime || "1970-01-01T00:00:00Z"
                }
                id="endDateTime"
                onChange={formChangeHandler}
              />
              <FieldErrorComponent field={fieldErrors.endDateTime} />
            </div>
            <div className="flex flex-col">
              <label>Outcome</label>
              <textarea
                value={currentCarePlanDetails.outcome || ""}
                id="outcome"
                onChange={formChangeHandler}
              />
              <FieldErrorComponent field={fieldErrors.outcome} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default ViewingArea;
