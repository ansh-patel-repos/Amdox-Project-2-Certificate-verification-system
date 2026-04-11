import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

export const AdminDashboard = () => {

  const { certificateCount, logs } = useContext(AppContext)
    
  const data = [
    { name: "Mon", verifications: 20 },
    { name: "Tue", verifications: 35 },
    { name: "Wed", verifications: 15 },
    { name: "Thu", verifications: 40 },
    { name: "Fri", verifications: 25 },
  ];

  const pieData = [
    { name: "Valid", value: 80 },
    { name: "Invalid", value: 20 },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="p-6 space-y-6">

      <div className="rounded-3xl p-8 text-white shadow-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h1 className="text-3xl font-bold">Dashboard Overview 🚀</h1>
        <p className="opacity-90 mt-2">
          Monitor certificates, verifications and system activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="backdrop-blur-lg bg-white/60 border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <p className="text-gray-500 text-sm">Total Certificates</p>
          <h2 className="text-3xl font-bold mt-2">
            {certificateCount > 0 ? certificateCount : 0}
          </h2>
        </div>

        <div className="backdrop-blur-lg bg-white/60 border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <p className="text-gray-500 text-sm">Verified Today</p>
          <h2 className="text-3xl font-bold mt-2">
            {
              logs.filter((log) =>
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


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="backdrop-blur-lg bg-white/60 border border-white/30 p-6 rounded-2xl shadow-lg">
          <h2 className="font-semibold mb-4 text-lg">Weekly Verifications</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="verifications"
                fill="url(#colorGradient)"
                radius={[10, 10, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="backdrop-blur-lg bg-white/60 border border-white/30 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <h2 className="font-semibold mb-4 text-lg">Verification Status</h2>

          <PieChart width={250} height={250}>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={90}
              innerRadius={60}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>

          <div className="flex gap-4 mt-4">
            <span className="text-sm flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span> Valid
            </span>
            <span className="text-sm flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span> Invalid
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};