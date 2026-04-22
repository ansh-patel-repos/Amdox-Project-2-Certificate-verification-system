import { useAuth, useUser } from "@clerk/clerk-react";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FiMail, FiUser, FiShield, FiClock } from "react-icons/fi";
import { EditProfileModal } from "../components/EditProfileModal";
import { useCertificateCount } from "./AdminDashboard";
import { useLogs } from "./AdminLogs";

const AdminProfilePage = () => {

  const { user } = useUser();
  const { getToken } = useAuth();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const { userData, logs, uploadedFiles } = useContext(AppContext);
  const { data } = useCertificateCount(getToken, BASE_URL)
  const { data: logsData } = useLogs(getToken, BASE_URL)
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="page-container">

      <div className="hero-gradient flex flex-col md:flex-row items-center text-center md:text-left gap-6">

        <div className="relative">
          <img
            src={user?.imageUrl}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="flex-1 flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-bold">
            {userData?.firstName} {userData?.lastName}
          </h1>

          <p className="flex items-center gap-2 mt-1 opacity-90">
            <FiMail /> {userData?.email}
          </p>

          <div className="flex items-center gap-3 mt-3">
            <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full font-medium">
              {userData?.role?.toUpperCase()}
            </span>

            <span className="text-green-300 text-sm font-medium">
              ● Active
            </span>
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={() => setShowEditModal(true)}
        >
          Edit Profile
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="card-glass">

          <h2 className="section-title flex items-center gap-2">
            <FiUser /> Account Information
          </h2>

          <div className="space-y-3 text-sm text-gray-700">

            <p>
              <span className="font-semibold">User ID:</span>{" "}
              {userData?.clerkId}
            </p>

            <p>
              <span className="font-semibold">Email Verified:</span>{" "}
              {user?.primaryEmailAddress?.verification?.status === "verified"
                ? <span className="text-green-500">Yes ✅</span>
                : <span className="text-red-500">No ❌</span>}
            </p>

            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(userData?.createdAt).toLocaleDateString()}
            </p>

          </div>
        </div>

        <div className="card-glass">

          <h2 className="section-title flex items-center gap-2">
            <FiShield /> Security & Status
          </h2>

          <div className="space-y-3 text-sm text-gray-700">

            <p className="flex items-center gap-2">
              <FiClock />
              <span className="font-semibold">Last Sign In:</span>{" "}
              {new Date(userData?.createdAt).toLocaleString()}
            </p>

            <p>
              <span className="font-semibold">2FA Enabled:</span>{" "}
              <span className="text-yellow-500">No</span>
            </p>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-green-600 font-semibold">Active</span>
            </p>

          </div>
        </div>

      </div>

      <div className="card-glass">

        <h2 className="section-title">Activity Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">

          <div className="p-5 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow">
            <p className="text-2xl font-bold">{uploadedFiles.length}</p>
            <p className="text-sm opacity-80">Files Uploaded</p>
          </div>

          <div className="p-5 rounded-2xl bg-linear-to-r from-green-400 to-green-600 text-white shadow">
            <p className="text-2xl font-bold">{data?.message > 0 ? data.message : 0}</p>
            <p className="text-sm opacity-80">Certificates</p>
          </div>

          <div className="p-5 rounded-2xl bg-linear-to-r from-pink-500 to-red-500 text-white shadow">
            <p className="text-2xl font-bold">{logsData?.logs.length}</p>
            <p className="text-sm opacity-80">Logs</p>
          </div>

        </div>

      </div>

      {showEditModal && (
        <EditProfileModal
          onClose={() => setShowEditModal(false)}
          userData={userData}
        />
      )}

    </div>
  );
};

export default AdminProfilePage;