import { useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const StudentProfilePage = () => {
  const { user } = useUser();
  const { certificates } = useContext(AppContext);

  const totalCertificates = certificates.length;
  const totalOrganizations = new Set(
    certificates.map((c) => c.issuedBy)
  ).size;
  const totalDomains = new Set(
    certificates.map((c) => c.internshipDomain)
  ).size;

  return (
    <div className="page-container space-y-6">

      <div className="rounded-3xl p-6 text-white shadow-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center gap-6">

        <div className="relative">
          <img
            src={user?.imageUrl}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            {user?.fullName || "Student"}
          </h1>

          <p className="opacity-90">
            {user?.primaryEmailAddress?.emailAddress}
          </p>

          <span className="inline-block mt-2 px-3 py-1 text-sm bg-white/20 rounded-full">
            🎓 Student
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="card-glass text-center">
          <h2 className="text-2xl font-bold text-indigo-600">
            {totalCertificates}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Certificates
          </p>
        </div>

        <div className="card-glass text-center">
          <h2 className="text-2xl font-bold text-green-600">
            {totalOrganizations}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Organizations
          </p>
        </div>

        <div className="card-glass text-center">
          <h2 className="text-2xl font-bold text-purple-600">
            {totalDomains}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Domains
          </p>
        </div>

      </div>

      <div className="card-glass space-y-4">

        <h2 className="text-lg font-semibold">
          Account Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-medium">{user?.id}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Email Verified</p>
            <p className="font-medium text-green-600">
              {user?.primaryEmailAddress?.verification?.status === "verified"
                ? "✔ Verified"
                : "❌ Not Verified"}
            </p>
          </div>

        </div>
      </div>

      <div className="card-glass">

        <h2 className="text-lg font-semibold mb-4">
          Recent Certificates
        </h2>

        {certificates.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No certificates found
          </p>
        ) : (
          <div className="space-y-3">

            {certificates.slice(0, 3).map((cert) => (
              <div
                key={cert._id}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 transition"
              >

                <div>
                  <p className="font-semibold">
                    {cert.certificateId}
                  </p>
                  <p className="text-sm text-gray-500">
                    {cert.internshipDomain}
                  </p>
                </div>

                <button
                  onClick={() => window.open(cert.certificateUrl, "_blank")}
                  className="btn-primary text-sm"
                >
                  View
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};