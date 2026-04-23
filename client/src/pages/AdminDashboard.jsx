import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl, getAuthHeaders } from '../App'
import { FaArrowLeft, FaUsers, FaCrown, FaUser } from 'react-icons/fa'

function AdminDashboard() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const result = await axios.get(ServerUrl + "/api/user/all-users", { headers: getAuthHeaders() })
            setUsers(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            if (error.response?.status === 403) {
                alert("Access denied. Admin only.");
                navigate("/");
            }
        }
    }

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.patch(ServerUrl + "/api/user/" + userId + "/role", { role: newRole }, { headers: getAuthHeaders() })
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u))
        } catch (error) {
            console.log(error)
            alert("Failed to update role")
        }
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 py-10'>
            <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>

                <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
                    <button
                        onClick={() => navigate("/")}
                        className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
                        <FaArrowLeft className='text-gray-600' />
                    </button>

                    <div>
                        <h1 className='text-3xl font-bold flex-nowrap text-gray-800 flex items-center gap-3'>
                            <FaUsers className='text-emerald-600' />
                            Admin Dashboard
                        </h1>
                        <p className='text-gray-500 mt-2'>
                            View and manage all registered users
                        </p>
                    </div>
                </div>

                <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-gray-50 border-b'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>User</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>Email</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>Credits</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>Role</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>Joined</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100'>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className='px-6 py-8 text-center text-gray-500'>
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className='px-6 py-8 text-center text-gray-500'>
                                            No users found.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id} className='hover:bg-gray-50 transition'>
                                            <td className='px-6 py-4'>
                                                <div className='flex items-center gap-3'>
                                                    <div className='w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold text-sm'>
                                                        {user.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className='font-medium text-gray-800'>{user.name}</span>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 text-gray-600 text-sm'>{user.email}</td>
                                            <td className='px-6 py-4'>
                                                <span className='bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium'>
                                                    {user.credits}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4'>
                                                {user.role === "admin" ? (
                                                    <span className='flex items-center gap-1 text-purple-600 text-sm font-medium'>
                                                        <FaCrown size={14} /> Admin
                                                    </span>
                                                ) : (
                                                    <span className='flex items-center gap-1 text-gray-500 text-sm'>
                                                        <FaUser size={14} /> User
                                                    </span>
                                                )}
                                            </td>
                                            <td className='px-6 py-4 text-gray-500 text-sm'>
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className='px-6 py-4'>
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                    className='text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer'
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='mt-6 text-center text-gray-500 text-sm'>
                    Total Users: {users.length}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard