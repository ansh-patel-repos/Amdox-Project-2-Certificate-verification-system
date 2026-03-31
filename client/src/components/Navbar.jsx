import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

export const Navbar = () => {

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="text-xl font-bold text-gray-900">
          CertifyX
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/verify"
            className="text-gray-600 hover:text-blue-600 transition font-medium"
          >
            Verify
          </Link>
          {user ?
            <div>
              <UserButton />
            </div>
            :
            <Link
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          }
        </div>

      </div>
    </nav>
  );
};