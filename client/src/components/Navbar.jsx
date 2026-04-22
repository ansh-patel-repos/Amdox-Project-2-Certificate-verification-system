import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { lazy, Suspense, useState } from "react";

const UserButton = lazy(() =>
  import("@clerk/clerk-react").then((mod) => ({
    default: mod.UserButton,
  }))
);

const SignInButton = lazy(() =>
  import("@clerk/clerk-react").then((mod) => ({
    default: mod.SignInButton,
  }))
);

export const Navbar = () => {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative">

        <Link to="/" className="text-2xl font-bold text-blue-600 z-10">
          Certify<span className="text-gray-800">X</span>
        </Link>

        {/* Desktop Links */}
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

        <div className="flex items-center gap-4 z-10">
          <Suspense fallback={<div className="w-10 h-10"></div>}>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Login
                </button>
              </SignInButton>
            )}
          </Suspense>

          {/* Hamburger Menu Toggle */}
          <button 
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4 text-center z-40">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2">
            Home
          </Link>
          <Link to="/verify" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2">
            Verify
          </Link>
          {isSignedIn && (
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2">
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
