import React from "react";
import { FaCheck } from "react-icons/fa";
import { motion, AnimatePresence, Variants } from "framer-motion";

const Stepper = ({ step }) => {
  const steps = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center w-full relative">
      {/* Progress Bar */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2 z-0">
        <motion.div
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4 }}
        ></motion.div>
      </div>

      {/* Steps Container */}
      <div className="flex justify-between w-full relative z-10">
        {steps.map((s, index) => (
          <React.Fragment key={s}>
            <div className="relative flex flex-col items-center">
              {/* Step Indicator Circle */}
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform ${
                  step === s
                    ? "bg-blue-500 text-white scale-125 shadow-lg"
                    : step > s
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
                aria-label={`Step ${s}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {step > s ? (
                  <FaCheck size={18} aria-hidden="true" />
                ) : (
                  <span className="text-lg font-bold">{s}</span>
                )}
              </motion.div>

              {/* Tooltip for step description */}
              <motion.div
                className={`absolute top-14 text-sm font-medium text-center transition-all duration-300 ease-in-out ${
                  step === s ? "text-blue-500 opacity-100" : "text-gray-500 opacity-0"
                }`}
                style={{ minWidth: "100px" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: step === s ? 1 : 0, y: step === s ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                Step {s} Description
              </motion.div>
            </div>

            {/* Connecting Line (for smaller screens) */}
            {index < steps.length - 1 && (
              <motion.div
                className={`absolute h-1 w-1/4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
                  step > s ? "bg-green-500" : "bg-gray-300"
                }`}
                style={{
                  left: `${25 + index * 25}%`,
                }}
                initial={{ width: 0 }}
                animate={{ width: step > s ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              ></motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;