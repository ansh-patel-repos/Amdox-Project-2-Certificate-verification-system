import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const Sidebar = () => {

  const { userData } = useContext(AppContext)

  return (
    <div className="w-64 bg-white border-r p-6">

      <h2 className="text-2xl font-bold text-blue-600 mb-8">
        CertifyX
      </h2>

      <nav className="flex flex-col gap-3">

        {userData && userData.role === "admin" ?
          <>
            <Link to="/dashboard" className="px-3 py-2 rounded-lg hover:bg-blue-50">
              📊 Overview
            </Link>

            <Link to="/dashboard/upload" className="px-3 py-2 rounded-lg hover:bg-blue-50">
              ⬆ Upload
            </Link>

            <Link to="/dashboard/logs" className="px-3 py-2 rounded-lg hover:bg-blue-50">
              📄 Logs
            </Link>

            <Link to="/dashboard/profile" className="px-3 py-2 rounded-lg hover:bg-blue-50">
              👤 Profile
            </Link>
          </>
          : 
          <>
            <Link to="/dashboard" className="px-3 py-2 rounded-lg hover:bg-blue-50">
              🏠 Overview
            </Link>

            <Link to="/dashboard/certificates" className="px-3 py-2 rounded-lg hover:bg-blue-50">
              📄 My Certificates
            </Link>

            <Link to="/verify" className="px-3 py-2 rounded-lg hover:bg-blue-50">
              🔍 Verify
            </Link>

            <Link to="/dashboard/profile" className="px-3 py-2 rounded-lg hover:bg-blue-50">
              👤 Profile
            </Link>
          </>
}
      </nav>
    </div>
  );
};

