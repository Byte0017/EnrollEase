import React from "react";

const PersonalDetail = ({ data, onChange }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Personal Details</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={data.name}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Aadhar No.</label>
        <input
          type="text"
          name="aadharNo"
          placeholder="Enter Aadhar number"
          value={data.aadharNo}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={data.dob}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category"
          value={data.category}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="">Select Category</option>
          <option value="General">General</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Caste</label>
        <input
          type="text"
          name="caste"
          placeholder="Enter caste"
          value={data.caste}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Religion</label>
        <input
          type="text"
          name="religion"
          placeholder="Enter religion"
          value={data.religion}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nationality</label>
        <input
          type="text"
          name="nationality"
          placeholder="Enter nationality"
          value={data.nationality}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
    </div>
  </div>
);

export default PersonalDetail;