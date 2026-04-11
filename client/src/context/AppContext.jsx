import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios"

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [userData, setUserData] = useState(null);
    const [certificateCount, setCertificateCount] = useState(0)
    const [logs, setLogs] = useState([]);
    const [verifyCount, setVerifyCount] = useState(0)
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true)


    const fetchUser = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get(BASE_URL + "/api/auth/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (data.success) {
                setUserData(data.user)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchAllCertificate = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(`${BASE_URL}/api/admin/getAllCertificates`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                setCertificateCount(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            setCertificateCount(0);
        }
    }

    const fetchLogs = async () => {

        const token = await getToken();

        const { data } = await axios.get("http://localhost:3000/api/admin/logs", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (data.success) {
            setLogs(data.logs);
        }
    };

    const uploadedFileData = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get(`${BASE_URL}/api/admin/getUploadedFiles`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setUploadedFiles(data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCertificateByEmail = async () => {
        try {
            const userEmail = userData && userData.email
            const token = await getToken();

            const { data } = await axios.post(`${BASE_URL}/api/certificate/getCertiByEmail`,
                { userEmail },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            if (data.success) {
                setLoading(false)
                setCertificates(data.certificateData)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            fetchUser();
        }
    }, [isLoaded, isSignedIn]);

    useEffect(() => {
        if (isLoaded && isSignedIn && userData && userData.role === "admin") {
            fetchAllCertificate();
        }
    }, [isLoaded, isSignedIn, userData])

    useEffect(() => {
        if (isLoaded && isSignedIn && userData && userData.role === "admin") {
            fetchLogs();
        }
    }, [isLoaded, isSignedIn, verifyCount, userData]);

    useEffect(() => {
        if (isLoaded && isSignedIn && userData && userData.role === "admin") {
            uploadedFileData();
        }
    }, [isLoaded, isSignedIn, userData]);

    useEffect(() => {
        if (userData && userData.role === "student") {
            fetchCertificateByEmail();
        }
    }, [isLoaded, isSignedIn, userData, loading])

    const value = {
        userData, certificateCount, logs, setVerifyCount, verifyCount, uploadedFileData, uploadedFiles, certificates, loading
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}