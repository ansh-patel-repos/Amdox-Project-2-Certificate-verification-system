import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {

  const {certificates} = useContext(AppContext)
  const navigate = useNavigate();

  const total = certificates.length;
  const orgs = [...new Set(certificates.map(c => c.issuedBy))].length;

  return (
    <div className="p-6 space-y-6">

      <div className="rounded-3xl p-5 md:p-8 text-white shadow-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h1 className="text-3xl font-bold">Welcome back, Ansh 👋</h1>
        <p className="opacity-90 mt-2">
          Track, manage and verify your certificates in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Certificates", value: total, icon: "📄" },
          { title: "Organizations", value: orgs, icon: "🏫" },
        ].map((card, i) => (
          <div
            key={i}
            className="backdrop-blur-lg bg-white/60 border border-white/30 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm">{card.title}</p>
                <h2 className="text-2xl font-bold">{card.value}</h2>
              </div>
              <div className="text-3xl">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="backdrop-blur-lg bg-white/60 border border-white/30 rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Quick Actions</h2>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4">
          <button onClick={() => navigate("/verify")} className="px-5 py-2 w-full sm:w-auto rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium shadow hover:scale-105 transition text-center">
            Verify Certificate
          </button>

          <button onClick={() => navigate("/dashboard/certificates")} className="px-5 py-2 w-full sm:w-auto rounded-xl border border-gray-300 hover:bg-gray-100 transition text-center">
            View Certificates
          </button>
        </div>
      </div>

      <div className="backdrop-blur-lg bg-white/60 border border-white/30 rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Certificates</h2>

        {certificates.length === 0 ? (
          <p className="text-gray-500">No certificates found</p>
        ) : (
          <div className="space-y-3">
            {certificates.slice(0, 4).map((cert) => (
                <div
                key={cert._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-start gap-2 p-3 rounded-xl hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-semibold">{cert.certificateId}</p>
                  <p className="text-sm text-gray-500">{cert.internshipDomain}</p>
                </div>

                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600 font-medium">
                  Active Certificate
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;

