import React from "react";

const Address = ({ data, onChange }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Address Details</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          placeholder="Enter address"
          value={data.address}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">District</label>
        <input
          type="text"
          name="district"
          placeholder="Enter district"
          value={data.district}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Pincode</label>
        <input
          type="text"
          name="pincode"
          placeholder="Enter pincode"
          value={data.pincode}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          name="state"
          placeholder="Enter state"
          value={data.state}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <input
          type="text"
          name="country"
          placeholder="Enter country"
          value={data.country}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
    </div>
  </div>
);

export default Address;