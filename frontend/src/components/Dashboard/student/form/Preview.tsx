import React from "react";
import Modal from "react-modal";

const Preview = ({ isOpen, onRequestClose, document }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Document Preview"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-2xl font-bold mb-4">Document Preview</h2>
      {document && (
        <iframe 
          src={URL.createObjectURL(document)} 
          className="w-full h-96" 
          title="Document Preview"
        />
      )}
      <button
        onClick={onRequestClose}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Close
      </button>
    </Modal>
  );
};

export default Preview;