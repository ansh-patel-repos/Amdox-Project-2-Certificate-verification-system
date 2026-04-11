import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const AdminLogsPage = () => {

    const { logs } = useContext(AppContext);

    return (
        <div className="page-container">

            <div className="hero-gradient">
                <h1 className="text-3xl font-bold">Verification Logs 📊</h1>
                <p className="opacity-90 mt-2">
                    Track all certificate verification activity in real-time
                </p>
            </div>

            <div className="card-glass">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="section-title">All Logs</h2>

                    <input
                        type="text"
                        placeholder="Search logs..."
                        className="input w-60"
                    />
                </div>

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="py-3 text-center">Certificate ID</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Verified By</th>
                            </tr>
                        </thead>

                        <tbody>
                            {logs.map((log) => (
                                <tr
                                    key={log._id}
                                    className="border-b hover:bg-gray-100 transition text-center"
                                >
                                    <td className="py-3 font-medium">
                                        {log.certificateId}
                                    </td>

                                    <td>
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

                                    <td className="text-gray-500">
                                        {new Date(log.verifiedAt).toLocaleString()}
                                    </td>

                                    <td className="text-gray-700">
                                        {log.verifiedBy}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                    {logs.length === 0 && (
                        <p className="text-center text-gray-400 py-6">
                            No logs found
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
};