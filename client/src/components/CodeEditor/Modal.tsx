import ReactModal from "react-modal";
import Select from "react-select";

const fontOptions = [
  { value: 12, label: "12px" },
  { value: 14, label: "14px" },
  { value: 16, label: "16px" },
  { value: 18, label: "18px" },
  { value: 20, label: "20px" },
];

export default function Modal({ isModalOpen, closeModal, fontSize, setFontSize}: any) {
  function getCurrentFontOption() {
    return (
      fontOptions.find((option) => option.value === fontSize) || fontOptions[1]
    );
  }
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      className="mx-auto mt-32 w-[500px] bg-zinc-900 text-white p-6 rounded-lg shadow-xl outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
    >
      <h2 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2">
        Editor Settings
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium">Font Size</label>
          <Select
            options={fontOptions}
            defaultValue={getCurrentFontOption()}
            className="text-black"
            onChange={(option: any) => setFontSize(option?.value || 16)}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={closeModal}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </ReactModal>
  );
}
