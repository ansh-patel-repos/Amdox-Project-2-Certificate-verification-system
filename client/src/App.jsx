import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import { VerifyCertificate } from "./pages/VerifyCertificatePage";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import { AdminUpload } from "./pages/AdminUpload";
import { AdminDashboardLayout } from "./layout/AdminDashbordLayout";
import { AdminLogsPage } from "./pages/AdminLogs";
import { AdminProfilePage } from "./pages/AdminProfile";
import { AdminDashboard } from "./pages/AdminDashboard";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { StudentDashboardLayout } from "./layout/StudentDashboardLayout";
import { StudentDashboard } from "./pages/StudentDashboard";
import { StudentCertificates } from "./pages/StudentCertificatesPage";
import { StudentProfilePage } from "./pages/StudentProfile";

function App() {

  const {userData} = useContext(AppContext);
  console.log(userData);
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<VerifyCertificate />} />

          <Route path="/admin/upload" element={<AdminUpload />} />
          { userData && userData.role === "admin" ?
            <Route path="/dashboard" element={<AdminDashboardLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="upload" element={<AdminUpload />} />
              <Route path="logs" element={<AdminLogsPage />} />
              <Route path="profile" element={<AdminProfilePage />} />
            </Route>
            : 
            <Route path="/dashboard" element={<StudentDashboardLayout/>}>
              <Route index element={<StudentDashboard/>}/>
              <Route path="certificates" element={<StudentCertificates/>}/>
              <Route path="profile" element={<StudentProfilePage/>}/>
            </Route>
          }
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;