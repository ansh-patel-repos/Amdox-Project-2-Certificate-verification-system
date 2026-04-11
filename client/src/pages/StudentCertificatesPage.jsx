import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export const StudentCertificates = () => {

    const { certificates, loading } = useContext(AppContext)
    const navigate = useNavigate();

    if (certificates) {
        console.log(certificates);
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    if(loading) {
        return <p className="text-center mt-10">Loading certificates...</p>
    }

    return (
        <div className="page-container">

            <div className="hero-gradient">
                <h1 className="text-3xl font-bold">My Certificates 📄</h1>
                <p className="opacity-90 mt-2">
                    Manage and verify your certificates easily
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {!certificates || certificates.length === 0 ? (
                    <p className="text-gray-400 text-center col-span-full">
                        No certificates found
                    </p>
                ) : (
                    [...certificates].reverse().map((cert, index) => (
                        <div
                            key={index}
                            className="card-glass hover:scale-[1.02] transition duration-300"
                        >

                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-semibold text-gray-800">
                                    Certificate ID: {cert.certificateId}
                                </h3>

                                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                                    Valid Certificate
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm">
                                Domain: <span className="font-medium">{cert.internshipDomain}</span>
                            </p>
                            <p className="text-sm text-gray-600">Issued by: <span className="font-medium">{cert.issuedBy}</span></p>
                            <p className="text-sm text-gray-600">Issue Date: <span>{formatDate(cert.issuedDate)}</span></p>

                            <div className="mt-4">
                                <button onClick={() => window.open(cert.certificateUrl, "_blank")} className="btn-primary text-sm">
                                    View Certificate
                                </button>
                                <a
                                    href={cert.certificateUrl}
                                    download
                                    className="ml-2 btn-outline text-sm"
                                >
                                    Download
                                </a>
                            </div>

                        </div>
                    ))
                )}

            </div>

            <div className="card-glass mt-6">

                <h2 className="section-title">
                    Quick Verify Certificate
                </h2>

                <div className="flex flex-col md:flex-row gap-3">

                    <input
                        type="text"
                        placeholder="Enter Certificate ID"
                        className="input flex-1"
                    />

                    <button className="btn-primary" onClick={() => navigate("/verify")} >
                        Verify
                    </button>

                </div>

            </div>

        </div>
    );
};