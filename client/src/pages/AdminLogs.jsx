import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import useSWR from "swr";
import axios from "axios";

export const useLogs = (getToken, BASE_URL) => {
    return useSWR(BASE_URL ? [BASE_URL + '/api/admin/logs', getToken] : null,
        async ([url, getTokenFn]) => {
            const token = await getTokenFn();
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        }
    )
}

const AdminLogsPage = () => {

    const { getToken } = useAuth();
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const { data, error, isLoading } = useLogs(getToken, BASE_URL)

    return (
        <div className="page-container">

            <div className="hero-gradient">
                <h1 className="text-3xl font-bold">Verification Logs 📊</h1>
                <p className="opacity-90 mt-2">
                    Track all certificate verification activity in real-time
                </p>
            </div>

            <div className="card-glass">

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 text-center md:text-left">
                    <h2 className="section-title mb-0">All Logs</h2>

                    <input
                        type="text"
                        placeholder="Search logs..."
                        className="input w-full md:w-60"
                    />
                </div>

                <div className="overflow-x-auto pb-4">

                    <table className="w-full text-sm whitespace-nowrap">

                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="p-3 text-center">Certificate ID</th>
                                <th className="p-3 text-center">Status</th>
                                <th className="p-3 text-center">Date</th>
                                <th className="p-3 text-center">Verified By</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data?.logs.map((log) => (
                                <tr
                                    key={log._id}
                                    className="border-b hover:bg-gray-100 transition text-center"
                                >
                                    <td className="p-3 font-medium">
                                        {log.certificateId}
                                    </td>

                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${log.status === "valid"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {log.status}
                                        </span>
                                    </td>

                                    <td className="p-3 text-gray-500">
                                        {new Date(log.verifiedAt).toLocaleString()}
                                    </td>

                                    <td className="p-3 text-gray-700">
                                        {log.verifiedBy}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                    {data?.logs.length === 0 && (
                        <p className="text-center text-gray-400 py-6">
                            No logs found
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
};

export default AdminLogsPage;