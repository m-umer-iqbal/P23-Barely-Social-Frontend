import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../components/Logo"
import LeftSideBar from "../components/sections/LeftSideBar";
import MainSection from '../components/sections/MainSection';
import RightSideBar from '../components/sections/RightSideBar';
import { idContext, globalRefreshContext, IsPostContentEditableContextUpdate, EditPostContextUpdate, profilePictureContext } from "../context/context"
import BottomNavbar from "../components/subComponents/BottomNavbar";
import SuccessOrWarningMessage from "../components/subComponents/SuccessOrWarningMessage";

const Home = () => {
    const [activeView, setActiveView] = useState('home');
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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && window.innerWidth < 1536) {
                // At lg screens (1024px to 2xl), only show "home" or "people" views
                if (activeView === "profile") {
                    setActiveView("home"); // Auto-switch to home view
                }
            }
        };

        handleResize(); // Run on mount
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [activeView]);

    const checkAuth = async () => {
        setTimeout(async () => {
            try {
                let response = await fetch("http://localhost:3000/check-auth", {
                    method: "GET",
                    credentials: "include"
                });

                let data = await response.json();

                if (data.authenticated) {
                    setUser(data.user);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                setAlertType({ alert: 'error', message: "Error Checking User Authentication" })
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
        <profilePictureContext.Provider value={user?.profilePicture || "https://picsum.photos/2000.webp"}>
            <idContext.Provider value={user?.id || ""}>
                <div className='h-screen bg-dark-blue-900 overflow-hidden
                                p-2
                                sm:p-4
                                md:p-5 
                                lg:p-6 lg:flex md:gap-4
                                xl:p-7
                                2xl:p-8'>

                    {alertType && alertType.alert && (
                        <SuccessOrWarningMessage alert={alertType.alert} message={alertType.message} onClose={() => setAlertType(null)} />
                    )}

                    <LeftSideBar
                        fullname={user?.fullname || ""}
                        username={user?.username || ""}
                        bio={user?.bio || ""}
                        email={user?.email || ""}
                        followers={user?.followers.length || 0}
                        following={user?.following.length || 0}
                        profilePicture={user?.profilePicture || "https://picsum.photos/2000.webp"}
                        activeView={activeView}
                    />

                    <IsPostContentEditableContextUpdate>
                        <EditPostContextUpdate>
                            <MainSection activeView={activeView} />
                        </EditPostContextUpdate>
                    </IsPostContentEditableContextUpdate>

                    <RightSideBar activeView={activeView} />

                    <BottomNavbar activeView={activeView} setActiveView={setActiveView} />
                </div>
            </idContext.Provider>
        </profilePictureContext.Provider>
    );
}

export default Home;