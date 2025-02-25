import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Stepper from "./Stepper";
import PersonalDetail from "./PersonalDetail";
import Parents from "./Parents";
import Address from "./Address";
import Academics from "./Academics";
import Doccument from "./Doccument";
import Preview from "./Preview";

Modal.setAppElement("#root");

const ApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    personalDetails: { name: "", aadharNo: "", dob: "", category: "", caste: "", religion: "", nationality: "" },
    parentsDetails: { 
      father: { name: "", occupation: "", qualification: "", income: "", email: "", phone: "" },
      mother: { name: "", occupation: "", qualification: "", income: "", email: "", phone: "" },
      guardian: { name: "", occupation: "", qualification: "", income: "", email: "", phone: "" }
    },
    addressDetails: { address: "", district: "", pincode: "", state: "", country: "" },
    academicDetails: {
      highSchool: { schoolName: "", board: "", rollNo: "", cgpa: "", yearOfPassing: "" },
      intermediate: { schoolName: "", board: "", rollNo: "", cgpa: "", yearOfPassing: "" }
    },
    documents: { 
      marksheet10th: null, 
      marksheet12th: null, 
      aadhar: null, 
      categoryCertificate: null, 
      domicileCertificate: null, 
      incomeCertificate: null, 
      medicalCertificate: null, 
      gapYearCertificate: null 
    },
    saveDetails: false,
  });

  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e, section, subSection = null) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        if (file.type !== "application/pdf") {
          toast.error("Only PDF files are allowed.");
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          toast.error("File size must be less than 2MB.");
          return;
        }
      }
    }

    if (subSection) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [subSection]: {
            ...formData[section][subSection],
            [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
          },
        },
      });
    } else {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
        },
      });
    }
  };

  const handleNext = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    console.log("Form Data Submitted:", formData);
    toast.success("Application Form successfully submitted!");
    setTimeout(() => {
      navigate("/student-dashboard");
    }, 2000);
  };

  const openPreviewModal = (document) => {
    setPreviewDocument(document);
    setPreviewModalIsOpen(true);
  };

  const closePreviewModal = () => {
    setPreviewModalIsOpen(false);
  };

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <Stepper step={step} />
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <PersonalDetail data={formData.personalDetails} onChange={(e) => handleChange(e, "personalDetails")} />
            )}
            {step === 2 && (
              <Parents data={formData.parentsDetails} onChange={(e, subSection) => handleChange(e, "parentsDetails", subSection)} />
            )}
            {step === 3 && (
              <Address data={formData.addressDetails} onChange={(e) => handleChange(e, "addressDetails")} />
            )}
            {step === 4 && (
              <Academics data={formData.academicDetails} onChange={(e, subSection) => handleChange(e, "academicDetails", subSection)} />
            )}
            {step === 5 && (
              <Doccument 
                data={formData.documents} 
                onChange={(e) => handleChange(e, "documents")} 
                onPreview={openPreviewModal} 
              />
            )}
          </motion.div>
        </AnimatePresence>

        {step === 5 && (
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="saveDetails"
                checked={formData.saveDetails}
                onChange={(e) => handleChange(e, "saveDetails")}
                className="mr-2"
              />
              Save my details for future use
            </label>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              onClick={handlePrev}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {step < 5 ? (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div>
      </div>

      <Preview
        isOpen={previewModalIsOpen}
        onRequestClose={closePreviewModal}
        document={previewDocument}
      />
    </div>
  );
};

export default ApplicationForm;