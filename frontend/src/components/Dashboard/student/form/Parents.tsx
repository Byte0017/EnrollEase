import React from "react";

const Parent = ({ data, onChange }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Parents and Guardian Details</h2>
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Father's Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter father's name"
              value={data.father.name}
              onChange={(e) => onChange(e, "father")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Occupation</label>
            <input
              type="text"
              name="occupation"
              placeholder="Enter occupation"
              value={data.father.occupation}
              onChange={(e) => onChange(e, "father")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Qualification</label>
            <input
              type="text"
              name="qualification"
              placeholder="Enter qualification"
              value={data.father.qualification}
              onChange={(e) => onChange(e, "father")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Annual Income</label>
            <input
              type="text"
              name="income"
              placeholder="Enter annual income"
              value={data.father.income}
              onChange={(e) => onChange(e, "father")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={data.father.email}
              onChange={(e) => onChange(e, "father")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={data.father.phone}
              onChange={(e) => onChange(e, "father")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Mother's Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter mother's name"
              value={data.mother.name}
              onChange={(e) => onChange(e, "mother")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Occupation</label>
            <input
              type="text"
              name="occupation"
              placeholder="Enter occupation"
              value={data.mother.occupation}
              onChange={(e) => onChange(e, "mother")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Qualification</label>
            <input
              type="text"
              name="qualification"
              placeholder="Enter qualification"
              value={data.mother.qualification}
              onChange={(e) => onChange(e, "mother")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Annual Income</label>
            <input
              type="text"
              name="income"
              placeholder="Enter annual income"
              value={data.mother.income}
              onChange={(e) => onChange(e, "mother")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={data.mother.email}
              onChange={(e) => onChange(e, "mother")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={data.mother.phone}
              onChange={(e) => onChange(e, "mother")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Guardian's Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Guardian's Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter guardian's name"
              value={data.guardian.name}
              onChange={(e) => onChange(e, "guardian")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Occupation</label>
            <input
              type="text"
              name="occupation"
              placeholder="Enter occupation"
              value={data.guardian.occupation}
              onChange={(e) => onChange(e, "guardian")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Qualification</label>
            <input
              type="text"
              name="qualification"
              placeholder="Enter qualification"
              value={data.guardian.qualification}
              onChange={(e) => onChange(e, "guardian")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Annual Income</label>
            <input
              type="text"
              name="income"
              placeholder="Enter annual income"
              value={data.guardian.income}
              onChange={(e) => onChange(e, "guardian")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={data.guardian.email}
              onChange={(e) => onChange(e, "guardian")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={data.guardian.phone}
              onChange={(e) => onChange(e, "guardian")}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Parent;