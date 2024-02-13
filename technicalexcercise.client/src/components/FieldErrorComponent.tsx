const FieldErrorComponent = ({ field }: { field: string | null }) => {
  return (
    <span className="text-red-500 text-xs">{field !== null ? field : ""}</span>
  );
};
export default FieldErrorComponent;
