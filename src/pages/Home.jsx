import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../components/Logo"
import LeftSideBar from '../components/LeftSideBar';
import MainSection from '../components/MainSection';
import RightSideBar from '../components/RightSideBar';
import { idContext } from "../context/context"
import { globalRefreshContext } from "../context/context"

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { globalRefresh } = useContext(globalRefreshContext)

    useEffect(() => {
        checkAuth();
        //Remove #_=_ automatically
        //This issue is from Facebook
        if (window.location.hash === "#_=_") {
            window.history.replaceState(null, null, window.location.pathname);
        }
    }, [globalRefresh]);

    const checkAuth = async () => {
        setTimeout(async () => {
            try {
                let response = await fetch("http://localhost:3000/check-auth", {
                    method: "GET",
                    credentials: "include" // This is correct
                });

                let data = await response.json();

                if (data.authenticated) {
                    setUser(data.user);
                } else {
                    navigate('/login');
                }
            } catch (error) {
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
                <LeftSideBar
                    fullname={user?.fullname || ""}
                    username={user?.username || ""}
                    bio={user?.bio || ""}
                    email={user?.email || ""}
                    followers={user?.followers.length || 0}
                    following={user?.following.length || 0}
                />
                <MainSection />
                <RightSideBar />
            </div>
        </idContext.Provider>
    );
}

export default Home;