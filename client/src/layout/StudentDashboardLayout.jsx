import { Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Sidebar } from "../components/Sidebar";

const StudentDashboardLayout = () => {
    const { user } = useUser();

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6">
                <Outlet />
            </div>

        </div>
    );
};

export default StudentDashboardLayout;

