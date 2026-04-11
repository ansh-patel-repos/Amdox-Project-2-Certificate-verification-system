import { Link } from "react-router-dom";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const Navbar = () => {
  const { isSignedIn } = useUser();
  const {userData} = useContext(AppContext)

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold text-blue-600">
          Certify<span className="text-gray-800">X</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className="relative hover:text-blue-600 transition after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 hover:after:w-full after:transition-all">
            Home
          </Link>

          <Link to="/verify" className="relative hover:text-blue-600 transition after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 hover:after:w-full after:transition-all">
            Verify
          </Link>

          {isSignedIn && (
            <Link to="/dashboard" className="relative hover:text-blue-600 transition after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 hover:after:w-full after:transition-all">
              Dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Login
              </button>
            </SignInButton>
          )}

        </div>
      </div>
    </nav>
  );
};
