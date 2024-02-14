const ContentBar = ({
  activeCarePlanId,
  formSubmitHandler,
  deleteClickHandler,
}: {
  activeCarePlanId: string;
  formSubmitHandler: (e: any) => void;
  deleteClickHandler: (e: any) => void;
}) => {
  return (
    <div className="w-full p-2 bg-slate-300 flex justify-between items-center border-b border-slate-500">
      <div className="flex gap-x-2">
        <span className="font-bold">Patient ID:</span>
        <span>{activeCarePlanId}</span>
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
  );
};
export default ContentBar;
