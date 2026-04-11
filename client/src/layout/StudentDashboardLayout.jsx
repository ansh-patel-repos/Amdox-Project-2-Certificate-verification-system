import { Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Sidebar } from "../components/Sidebar";

export const StudentDashboardLayout = () => {
    const { user } = useUser();

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6">
                <Outlet />
            </div>

        </div>
    );
};

