import { useState } from "react";

import Modal from "./Modal";

import type { CarePlan } from "../types/CarePlan";
import type { ActiveCarePlan } from "../types/ActiveCarePlan";

const CreateButton = ({
  carePlans,
  setCarePlans,
  setActiveCarePlan,
}: {
  carePlans: CarePlan[];
  setCarePlans: (arr: CarePlan[]) => void;
  activeCarePlan: ActiveCarePlan;
  setActiveCarePlan: (obj: ActiveCarePlan) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-700"
      >
        Create
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        carePlans={carePlans}
        setCarePlans={setCarePlans}
        setActiveCarePlan={setActiveCarePlan}
      />
    </div>
  );
};
export default CreateButton;
