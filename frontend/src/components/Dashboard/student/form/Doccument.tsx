import React from "react";

const Doccument = ({ data, onChange, onPreview }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Document Upload</h2>
      <div className="space-y-4">
        {/* Marksheet 10th */}
        <div>
          <label className="block text-sm font-medium text-gray-700">10th Marksheet</label>
          <input
            type="file"
            name="marksheet10th"
            onChange={onChange}
            className="w-full p-2 border rounded mt-1"
            accept="application/pdf"
          />
          {data.marksheet10th && (
            <button
              onClick={() => onPreview(data.marksheet10th)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Preview 10th Marksheet
            </button>
          )}
        </div>

        {/* Marksheet 12th */}
        <div>
          <label className="block text-sm font-medium text-gray-700">12th Marksheet</label>
          <input
            type="file"
            name="marksheet12th"
            onChange={onChange}
            className="w-full p-2 border rounded mt-1"
            accept="application/pdf"
          />
          {data.marksheet12th && (
            <button
              onClick={() => onPreview(data.marksheet12th)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Preview 12th Marksheet
            </button>
          )}
        </div>

        {/* Aadhar Card */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Aadhar Card</label>
          <input
            type="file"
            name="aadhar"
            onChange={onChange}
            className="w-full p-2 border rounded mt-1"
            accept="application/pdf"
          />
          {data.aadhar && (
            <button
              onClick={() => onPreview(data.aadhar)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Preview Aadhar Card
            </button>
          )}
        </div>

        {/* Category Certificate */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Certificate</label>
          <input
            type="file"
            name="categoryCertificate"
            onChange={onChange}
            className="w-full p-2 border rounded mt-1"
            accept="application/pdf"
          />
          {data.categoryCertificate && (
            <button
              onClick={() => onPreview(data.categoryCertificate)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Preview Category Certificate
            </button>
          )}
        </div>

        {/* Domicile Certificate */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Domicile Certificate</label>
          <input
            type="file"
            name="domicileCertificate"
            onChange={onChange}
            className="w-full p-2 border rounded mt-1"
            accept="application/pdf"
          />
          {data.domicileCertificate && (
            <button
              onClick={() => onPreview(data.domicileCertificate)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Preview Domicile Certificate
            </button>
          )}
        </div>

        {/* Income Certificate */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Income Certificate</label>
          <input
            type="file"
            name="incomeCertificate"
            onChange={onChange}
            className="w-full p-2 border rounded mt-1"
            accept="application/pdf"
          />
          {data.incomeCertificate && (
            <button
              onClick={() => onPreview(data.incomeCertificate)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Preview Income Certificate
            </button>
          )}
        </div>

        {/* Medical Certificate */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Medical Certificate</label>
          <input
            type="file"
            name="medicalCertificate"
            onChange={onChange}
            className="w-full p-2 border rounded mt-1"
            accept="application/pdf"
          />
          {data.medicalCertificate && (
            <button
              onClick={() => onPreview(data.medicalCertificate)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Preview Medical Certificate
            </button>
          )}
        </div>

        {/* Gap Year Certificate */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gap Year Certificate</label>
          <input
            type="file"
            name="gapYearCertificate"
            onChange={onChange}
            className="w-full p-2 border rounded mt-1"
            accept="application/pdf"
          />
          {data.gapYearCertificate && (
            <button
              onClick={() => onPreview(data.gapYearCertificate)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Preview Gap Year Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doccument;