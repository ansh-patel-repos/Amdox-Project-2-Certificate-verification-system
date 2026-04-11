import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

export const VerifyCertificate = () => {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const { setVerifyCount } = useContext(AppContext)
  const [certificateId, setCertificateId] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const { getToken, isSignedIn } = useAuth()
  const [preview, setPreview] = useState(false)

  const handleVerify = async () => {
    try {
      let token = null;

      try {
        token = await getToken();
      } catch (err) {
        token = null;
      }
      setLoading(true)
      const { data } = await axios.post(
        `${BASE_URL}/api/certificate/verify`,
        { certificateId },
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            "Content-Type": "application/json"
          },
        }
      );

      if (data.success) {
        setVerifyCount(prev => prev + 1)
        setResult(data)
        setCertificateId("")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center pt-10 pb-10 px-4 bg-linear-to-br from-indigo-100 via-white to-purple-100">

      <div className="w-full max-w-4xl mx-auto space-y-6">

        <div className="hero-gradient text-center">
          <h1 className="text-3xl font-bold">Verify Certificate 🔍</h1>
          <p className="opacity-90 mt-2">
            Instantly check certificate authenticity
          </p>
        </div>

        <div className="card-glass text-center space-y-4">

          <input
            type="text"
            placeholder="Enter Certificate ID (e.g. ABC123)"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
            className="input"
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
          />

          <button
            onClick={handleVerify}
            className="btn-primary w-full"
            disabled={!certificateId || loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Checking...
              </span>
            ) : "Verify Certificate"}
          </button>

        </div>

        {result && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 text-center flex justify-center items-center gap-2">
              🔍 Verification Result
            </h2>
            <div className="card-glass space-y-4">

              {result.valid ? (
                <>
                  <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-xl font-semibold text-center shadow-sm">
                    ✔ Certificate Verified Successfully
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-4">

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-semibold">{result.certificate.studentName}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Domain</p>
                      <p className="font-semibold">{result.certificate.internshipDomain}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Issued By</p>
                      <p className="font-semibold">{result.certificate.issuedBy}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="font-semibold">{result.certificate.issuedDate}</p>
                    </div>
                  </div>

                  {preview ?
                    <button onClick={() => setPreview(false)} className="btn-primary">Close Preview</button>
                    : <button onClick={() => setPreview(true)} className="btn-primary" >Preview Certificate</button>
                  }
                  {preview &&
                    <>
                      <div className="mt-6 border rounded-xl overflow-hidden shadow-md">
                        <img
                          src={result.certificate.certificateUrl}
                          alt="Certificate"
                          className="w-full"
                        />
                      </div>

                      <div className="flex flex-col md:flex-row gap-3 mt-4">
                        {isSignedIn ? (
                          <>
                        <a
                          href={result.certificate.certificateUrl}
                          target="_blank"
                          className="btn-primary text-center"
                        >
                          View Full Certificate
                        </a>
                        
                          <a
                            href={result.certificate.certificateUrl}
                            download
                            className="btn-outline text-center"
                          >
                            Download
                          </a>
                          </>
                        ) : (
                          <p className="text-sm text-gray-600 text-center inline-flex items-center">
                            🔒 Login to download certificate
                          </p>
                        )}
                      </div>
                    </>
                  }

                </>
              ) : (
                <>
                  <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl text-center">
                    ❌ Invalid Certificate
                    <p className="text-sm mt-2 text-gray-600">
                      Please check the certificate ID and try again.
                    </p>
                  </div>
                </>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};