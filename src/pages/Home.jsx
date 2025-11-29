import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../components/Logo"
import LeftSideBar from '../components/LeftSideBar';
import MainSection from '../components/MainSection';
import RightSideBar from '../components/RightSideBar';
import { idContext } from "../context/context.js"

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
        //Remove #_=_ automatically
        //This issue is from Facebook
        if (window.location.hash === "#_=_") {
            window.history.replaceState(null, null, window.location.pathname);
        }
    }, []);

    const checkAuth = async () => {
        setTimeout(async () => {
            try {
                let response = await fetch("http://localhost:3000/check-auth", {
                    method: "GET",
                    credentials: "include" // This is correct
                });

                console.log("Response status:", response.status);

                let data = await response.json();
                console.log("Auth response:", data);

                if (data.authenticated) {
                    setUser(data.user);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error("Auth check error:", error);
                alert("Error Occur In Checking User Authentication.");
                navigate("/login")
            } finally {
                setLoading(false)
            }
        }, 1000)
    }

    if (loading) {
        return <Logo width="100vw" slash="false" />
    }

    return (
        <idContext.Provider value={user?.id || ""}>
            <div className='flex gap-8 p-10 min-h-screen bg-dark-blue-900 max-h-screen'>
                <LeftSideBar fullname={user?.fullname || ""} username={user?.username || ""} bio={user?.bio || ""} email={user?.email || ""} />
                <MainSection />
                <RightSideBar />
                {/* <h1 className="text-5xl min-w-[60vw] bg-white">
                This is home of the barely social app for "{user?.fullname}" and their username is "{user?.username}" and email is "{user?.email}". Thank You!
            </h1> */}
            </div>
        </idContext.Provider>
    );
}

export default Home;