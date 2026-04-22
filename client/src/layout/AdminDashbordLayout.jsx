import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

const AdminDashboardLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;