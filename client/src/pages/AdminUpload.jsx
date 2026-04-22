import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const AdminUpload = () => {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const { uploadedFileData, uploadedFiles } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const { getToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedFileData, setSelectedFileData] = useState([]);

  const uploadFile = async () => {
    try {
      if (!file) return toast.error("Please select Excel file");

      if (!file.name.endsWith(".xlsx")) {
        return toast.error("Only Excel files allowed");
      }

      const token = await getToken();
      if (!token) return toast.error("Unauthorized");

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(
        `${BASE_URL}/api/admin/upload-certificate`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setFile(null);
        await uploadedFileData();
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFileView = async (id) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        `${BASE_URL}/api/admin/getCertificateByFileId`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        console.log(data);
        setSelectedFileData(data.data);
        setShowModal(true);
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFileDelete = async (id) => {
    try {
      const token = await getToken();

      const { data } = await axios.delete(
        `${BASE_URL}/api/admin/deleteCertificateData`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { fileId: id },
        }
      );

      if (data.success) {
        toast.success(data.message);
        uploadedFileData();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  const isDisabled = !file;

  return (
    <div className="page-container">

      <div className="hero-gradient">
        <h1 className="text-3xl font-bold">Upload Certificates 📤</h1>
        <p className="opacity-90 mt-2 ml-1">
          Upload Excel File
        </p>
      </div>

      <div className="card-glass p-6 space-y-6">

        <div>
          <h3 className="text-lg font-semibold mb-2">
            📄 Step 1: Upload Excel File
          </h3>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">

            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files[0])}
              className="input"
            />

            {file && (
              <p className="text-green-600 mt-2 text-sm">
                ✔ {file.name}
              </p>
            )}

          </div>
        </div>

        <div className="text-center">
          <button
            onClick={uploadFile}
            disabled={isDisabled}
            className={`btn-primary px-8 py-3 ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            🚀 Upload Certificate file
          </button>
        </div>

      </div>

      <div className="card-glass">
        <h2 className="section-title">Uploaded Files</h2>

        <div className="overflow-x-auto pb-4">
          <table className="w-full text-sm whitespace-nowrap">

            <thead className="text-gray-500 border-b">
              <tr>
                <th className="p-3 text-left">File Name</th>
                <th className="p-3 text-center">View</th>
                <th className="p-3 text-center">Delete</th>
                <th className="p-3 text-center">Uploaded At</th>
              </tr>
            </thead>

            <tbody>
              {uploadedFiles.map((file) => (
                <tr key={file._id} className="border-b hover:bg-gray-100 transition">
                  <td className="p-3 font-medium">{file.fileName}</td>

                  <td className="p-3 text-center">
                    <button
                      className="text-indigo-600 hover:underline"
                      onClick={() => handleFileView(file._id)}
                    >
                      View
                    </button>
                  </td>

                  <td className="p-3 text-center">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleFileDelete(file._id)}
                    >
                      Delete
                    </button>
                  </td>

                  <td className="p-3 text-gray-500 text-center">
                    {new Date(file.uploadedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">

          <div className="card-glass w-[90%] max-h-[80vh] overflow-y-auto">

            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">File Details</h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Course</th>
                  <th className="p-2 border">Issue Date</th>
                </tr>
              </thead>

              <tbody>
                {selectedFileData.map((cert, index) => (
                  <tr key={index} className="text-center border">
                    <td className="p-2 border">{cert.certificateId}</td>
                    <td className="p-2 border">{cert.studentName}</td>
                    <td className="p-2 border">{cert.internshipDomain}</td>
                    <td className="p-2 border">{cert.issuedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminUpload;