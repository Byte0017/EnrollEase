import React from "react";

const Academics = ({ data, onChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Academic Details</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">High School Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">School Name</label>
              <input
                type="text"
                name="schoolName"
                placeholder="Enter school name"
                value={data.highSchool.schoolName}
                onChange={(e) => onChange(e, "highSchool")}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Board</label>
              <input
                type="text"
                name="board"
                placeholder="Enter board"
                value={data.highSchool.board}
                onChange={(e) => onChange(e, "highSchool")}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Roll No.</label>
              <input
                type="text"
                name="rollNo"
                placeholder="Enter roll number"
                value={data.highSchool.rollNo}
                onChange={(e) => onChange(e, "highSchool")}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CGPA/Percentage</label>
              <input
                type="text"
                name="cgpa"
                placeholder="Enter CGPA/Percentage"
                value={data.highSchool.cgpa}
                onChange={(e) => onChange(e, "highSchool")}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year of Passing</label>
              <input
                type="text"
                name="yearOfPassing"
                placeholder="Enter year of passing"
                value={data.highSchool.yearOfPassing}
                onChange={(e) => onChange(e, "highSchool")}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Intermediate Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">School Name</label>
              <input
                type="text"
                name="schoolName"
                placeholder="Enter school name"
                value={data.intermediate.schoolName}
                onChange={(e) => onChange(e, "intermediate")}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Board</label>
              <input
                type="text"
                name="board"
                placeholder="Enter board"
                value={data.intermediate.board}
                onChange={(e) => onChange(e, "intermediate")}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Roll No.</label>
              <input
                type="text"
                name="rollNo"
                placeholder="Enter roll number"
                value={data.intermediate.rollNo}
                onChange={(e) => onChange(e, "intermediate")}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CGPA/Percentage</label>
              <input
                type="text"
                name="cgpa"
                placeholder="Enter CGPA/Percentage"
                value={data.intermediate.cgpa}
                onChange={(e) => onChange(e, "intermediate")}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year of Passing</label>
              <input
                type="text"
                name="yearOfPassing"
                placeholder="Enter year of passing"
                value={data.intermediate.yearOfPassing}
                onChange={(e) => onChange(e, "intermediate")}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academics;