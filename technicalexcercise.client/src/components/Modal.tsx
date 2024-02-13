const Modal = ({ isOpen, onClose }) => {
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
        <div className="z-50 bg-white flex flex-col justify-between text-black p-8 rounded-lg shadow-lg w-4/6 h-4/5">
          {/* Your modal content here */}
          <p>This is your modal content.</p>
          <div className="w-full flex gap-x-2 justify-end">
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
            <button
              onClick={onClose}
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
