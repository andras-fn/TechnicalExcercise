import type { FieldError } from "../types/FieldError";
import type { ActiveCarePlan } from "../types/ActiveCarePlan";

import FieldErrorComponent from "./FieldErrorComponent";

const CarePlanForm = ({
  currentCarePlanDetails,
  setCurrentCarePlanDetails,
  fieldErrors,
}: {
  currentCarePlanDetails: ActiveCarePlan;
  setCurrentCarePlanDetails: (obj: ActiveCarePlan) => void;
  fieldErrors: FieldError;
}) => {
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
  return (
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
          value={currentCarePlanDetails.endDateTime || "1970-01-01T00:00:00Z"}
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
  );
};
export default CarePlanForm;
