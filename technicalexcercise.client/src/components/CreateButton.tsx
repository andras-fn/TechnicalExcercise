import { useState } from "react";
import Modal from "./Modal";

const CreateButton = () => {
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
export default CreateButton;
