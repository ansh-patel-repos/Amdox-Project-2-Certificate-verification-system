import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { lazy, Suspense } from "react";
import { useAuth } from "@clerk/clerk-react";
import useSWR from 'swr';
import axios from 'axios';
import { useLogs } from "./AdminLogs";
const Charts = lazy(() => import("../components/Charts"));

export const useCertificateCount = (getToken, BASE_URL) => {
  return useSWR(
    BASE_URL ? [BASE_URL + '/api/admin/getAllCertificates', getToken] : null,
    async ([url, getTokenFn]) => {
      const token = await getTokenFn();
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    }
  );
};

export const AdminDashboard = () => {

  const { getToken } = useAuth();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const { data: certificateData } = useCertificateCount(getToken,BASE_URL)
  const { data: logsData, error, isLoading } = useLogs(getToken, BASE_URL)

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Verifications",
        data: [20, 35, 15, 40, 25],
        backgroundColor: "#6366f1",
        borderRadius: 10,
      },
    ],
  };

  const pieData = {
    labels: ["Valid", "Invalid"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">

      <div className="rounded-3xl p-5 md:p-8 text-white shadow-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h1 className="text-3xl font-bold">Dashboard Overview 🚀</h1>
        <p className="opacity-90 mt-2">
          Monitor certificates, verifications and system activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="backdrop-blur-lg bg-white/60 border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <p className="text-gray-500 text-sm">Total Certificates</p>
          <h2 className="text-3xl font-bold mt-2">
            {certificateData?.message > 0 ? certificateData?.message : 0}
          </h2>
        </div>

        <div className="backdrop-blur-lg bg-white/60 border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <p className="text-gray-500 text-sm">Verified Today</p>
          <h2 className="text-3xl font-bold mt-2">
            {
              logsData?.logs.filter((log) =>
                new Date(log.createdAt).toDateString() === new Date().toDateString()
              ).length
            }
          </h2>
        </div>

        <div className="backdrop-blur-lg bg-white/60 border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <p className="text-gray-500 text-sm">Admins</p>
          <h2 className="text-3xl font-bold mt-2">1</h2>
        </div>

      </div>

      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading Data Visuals...</div>}>
        <Charts barData={barData} pieData={pieData} />
      </Suspense>

    </div>
  );
};

export default AdminDashboard;