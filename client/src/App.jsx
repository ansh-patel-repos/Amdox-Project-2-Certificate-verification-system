import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { ToastContainer } from 'react-toastify';
import { AppContext } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
const Home = lazy(() => import("./pages/Home"));
const VerifyCertificate = lazy(() => import("./pages/VerifyCertificatePage"));
const AdminUpload = lazy(() => import("./pages/AdminUpload"));
const AdminDashboardLayout = lazy(() => import("./layout/AdminDashbordLayout"));
const AdminLogsPage = lazy(() => import("./pages/AdminLogs"));
const AdminProfilePage = lazy(() => import("./pages/AdminProfile"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const StudentDashboardLayout = lazy(() => import("./layout/StudentDashboardLayout"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const StudentCertificates = lazy(() => import("./pages/StudentCertificatesPage"));
const StudentProfilePage = lazy(() => import("./pages/StudentProfile"));

function App() {

  const { userData } = useContext(AppContext);
  console.log(userData);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-600 animate-ping"></div>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<VerifyCertificate />} />

            <Route path="/admin/upload" element={<AdminUpload />} />
            {userData && userData.role === "admin" ?
              <Route path="/dashboard" element={<AdminDashboardLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="upload" element={<AdminUpload />} />
                <Route path="logs" element={<AdminLogsPage />} />
                <Route path="profile" element={<AdminProfilePage />} />
              </Route>
              :
              <Route path="/dashboard" element={<StudentDashboardLayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="certificates" element={<StudentCertificates />} />
                <Route path="profile" element={<StudentProfilePage />} />
              </Route>
            }
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;