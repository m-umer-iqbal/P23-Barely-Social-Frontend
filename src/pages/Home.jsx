import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "../components/subComponents/Loading"

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
            } finally {
                setLoading(false);
            }
        }, 5000)
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <h1 className="text-5xl">
                This is home of the barely social app for "{user?.fullname}" and their username is "{user?.username}" and email is "{user?.email}". Thank You!
            </h1>
        </div>
    );
}

export default Home;