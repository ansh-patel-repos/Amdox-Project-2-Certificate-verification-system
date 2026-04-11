import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

export const EditProfileModal = ({ onClose, userData }) => {

    const BASE_URL = import.meta.env.VITE_BACKEND_URL
    const [formData, setFormData] = useState({
        clerkId: userData.clerkId,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phone: userData.phone || "",
        role: userData.role || "",
        organization: userData.organization || "",
    })

    const {getToken} = useAuth();

    const handleChange = (e) => {

        const {name, value} = e.target;
        
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }
    
    const handleSubmit = async (e) => {
        
        e.preventDefault()
        try {
            const {data} = await axios.patch(`${BASE_URL}/api/auth/updateUserDetails`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            if(data.success) {
                console.log(data);
            } else {
                toast.error(data.message)
            }
            onClose();
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-6 relative animate-fadeIn">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <FiX size={20} />
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Edit Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="input"
                    />

                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="input"
                    />

                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="input"
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="input"
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>

                    <input
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="College / Organization"
                        className="input md:col-span-2"
                    />

                    <input
                        value={userData?.email}
                        disabled
                        className="input md:col-span-2 bg-gray-100 cursor-not-allowed"
                    />

                </div>

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save Changes
                    </button>

                </div>
            </div>
        </div>
    );
}