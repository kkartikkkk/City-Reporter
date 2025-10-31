import React, { useEffect } from 'react'
import Admin from '../pages/Admin'
// import DashboardPage from '../Pages/DashboardPage'
// import Dashboard from '../dashboard/Dashboard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Render = () => {
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.auth.user);
    console.log(loggedInUser)
    const user = loggedInUser?.user

    useEffect(() => {
        if (!loggedInUser?.success) {
            navigate("/Login")
        }
    }, []);
    return (
        <>
            {
                user?.roles[0]?.name === 'Admin' ? (
                    // <Dashboard />
                    <AdminPanel />
                ) : (
                    <AdminPanel />
                  
                )
            }
        </>
    )
}

export default Render