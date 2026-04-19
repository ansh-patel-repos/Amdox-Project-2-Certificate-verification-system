import { Link } from "react-router-dom";
import { SignInButton, useUser } from "@clerk/clerk-react";

export const Footer = () => {

  const { isSignedIn } = useUser();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">

          <div>
            <h2 className="text-xl font-bold text-white">CertifyX</h2>
            <p className="mt-3 text-sm text-gray-400">
              Secure and fast certificate verification system for students and organizations.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold">Quick Links</h3>
            <div className="mt-3 flex flex-col gap-2">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/verify" className="hover:text-white transition">Verify</Link>

              {
                isSignedIn ? (
                  <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
                ) : (
                  <SignInButton mode="modal">
                    <button className="text-left hover:text-white transition">
                      Login
                    </button>
                  </SignInButton>
                )
              }
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold">Contact</h3>
            <p className="mt-3 text-sm text-gray-400">
              support@certifyx.com
            </p>
            <p className="text-sm text-gray-400">
              Ahmedabad, India
            </p>
          </div>

        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CertifyX. All rights reserved.
        </div>

      </div>
    </footer>
  );
};