import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const Sidebar = () => {

  const { userData } = useContext(AppContext)

  return (
    <div className="w-full md:w-64 md:min-h-screen bg-white border-b md:border-r border-gray-200 p-6 flex flex-col">

      <h2 className="hidden md:block text-2xl font-bold text-blue-600 mb-4 md:mb-8 text-center md:text-left">
        CertifyX
      </h2>

      <nav className="flex flex-row md:flex-col gap-3 overflow-x-auto pb-2 md:pb-0 whitespace-nowrap scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

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

