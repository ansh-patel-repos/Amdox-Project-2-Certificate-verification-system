import { useNavigate } from "react-router-dom";

export const SearchBox = () => {

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center">
        <button
          onClick={() => navigate("/verify")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:scale-105 transition"
        >
          Verify Certificate →
        </button>
    </div>
  );
};