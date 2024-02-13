const SideBar = ({ carePlans, activeCarePlan, setActiveCarePlan }) => {
  const handleClick = (e) => {
    const carePlanId = e.currentTarget.id;
    setActiveCarePlan(carePlans.find((carePlan) => carePlan.id === carePlanId));
  };

  return (
    <div className="min-h-full max-h-full min-w-[400px] p-2">
      <div className="overflow-y-scroll gap-y-2 flex flex-col pr-2 min-h-full max-h-full">
        {carePlans.map((carePlan) => (
          <div
            className={`w-full border border-black rounded p-2 hover:cursor-pointer flex flex-col ${
              carePlan.id === activeCarePlan.id ? "bg-slate-200" : ""
            }`}
            key={carePlan.id}
            id={carePlan.id}
            onClick={handleClick}
          >
            <div className="flex gap-x-2">
              <span className="font-bold">ID:</span>
              <span>{carePlan.id}</span>
            </div>
            <div className="flex gap-x-2">
              <span className="font-bold">Patient Name:</span>
              <span>
                {carePlan.title} {carePlan.patientName}
              </span>
            </div>

            <div className="flex  gap-x-2">
              <span className="font-bold">Target Start Date:</span>
              <span>{carePlan.targetStartDateTime.split("T")[0]}</span>
            </div>

            <div className="flex  gap-x-2">
              <span className="font-bold">Completed:</span>
              <span>{carePlan.completed ? "True" : "False"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SideBar;
