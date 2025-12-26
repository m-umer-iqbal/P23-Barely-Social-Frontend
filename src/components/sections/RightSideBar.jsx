import React, { useState, useEffect, useContext } from 'react'
import ToggleTabs from "./subComponents/ToggleTabs";
import UsersList from "./subComponents/UsersList";
import { idContext } from '../context/context';
import { globalRefreshContext } from "../context/context"
import Loading from "./subComponents/Loading";
import SuccessOrWarningMessage from "./subComponents/SuccessOrWarningMessage";

const RightSideBar = () => {
    const [alertType, setAlertType] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = useContext(idContext)
    const [active, setActive] = useState("follow");
    const [users, setUsers] = useState([])
    const { globalRefresh } = useContext(globalRefreshContext)

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                let response = await fetch(`http://localhost:3000/user?category=${active}&userId=${userId}`, {
                    method: "GET",
                    credentials: "include"
                });
                let data = await response.json();
                if (data.success) {
                    setUsers(data.usersList);
                    setLoading(false)
                } else {
                    setAlertType({ alert: 'error', message: data.message })
                    setLoading(false)
                }
            } catch (error) {
                setAlertType({ alert: 'error', message: "Error in sending request for fetching users" })
                setLoading(false)
            }
        }
        fetchProfiles()
    }, [globalRefresh, active, userId])

    // Add a function to handle tab changes
    const handleTabChange = (newActive) => {
        setActive(newActive);
        setUsers([]); // Clear previous users immediately
        setLoading(true); // Show loading state
    };

    return (
        <div className="hidden flex-col gap-4 min-w-[25vw] max-w-[25vw] p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl max-h-screen" >

            <ToggleTabs
                options={[
                    { label: "Following", value: "following" },
                    { label: "Strangers", value: "follow" }
                ]}
                active={active}
                setActive={handleTabChange}
                minWidth={49}
            />

            {alertType && alertType.alert && (
                <SuccessOrWarningMessage alert={alertType.alert} message={alertType.message} onClose={() => setAlertType(null)} />
            )}

            {loading ? <Loading /> : <div className="flex flex-col gap-4 max-h-screen overflow-y-auto [&::-webkit-scrollbar]:w-0">
                {users.map(user => (
                    <UsersList
                        key={user._id}
                        id={user._id}
                        fullname={user.fullname}
                        username={user.username}
                        bio={user.bio}
                        btnText={active === "follow" ? "Follow" : "Be Barely Social"}
                        profilePicture={user.profilePicture}
                    />
                ))}
            </div>}
        </div>
    )
}

export default RightSideBar
