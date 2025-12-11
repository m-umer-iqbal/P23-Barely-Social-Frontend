import React, { useState, useEffect, useContext } from 'react'
import ToggleTabs from "./subComponents/ToggleTabs";
import UsersList from "./subComponents/UsersList";
import { idContext } from '../context/context.js';

const RightSideBar = () => {
    const userId = useContext(idContext)
    const [active, setActive] = useState("friends");
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                let response = await fetch("http://localhost:3000/user", {
                    method: "GET",
                    credentials: "include"
                });
                let data = await response.json();
                if (data.success) {
                    setUsers(data.usersList);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert("Error in sending request for fetching users.")
            }
        }
        fetchProfiles()
    }, [])

    return (
        <div className="flex flex-col gap-4 min-w-[25vw] max-w-[25vw] p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl max-h-screen">

            <ToggleTabs
                options={[
                    { label: "Friends", value: "friends" },
                    { label: "Find Friends", value: "findFriends" }
                ]}
                active={active}
                setActive={setActive}
            />

            <div className="flex flex-col gap-4 max-h-screen overflow-y-auto [&::-webkit-scrollbar]:w-0">
                {users
                    .filter(user => user._id !== userId) // remove logged-in user
                    .map(user => (
                        <UsersList
                            key={user._id}
                            fullname={user.fullname}
                            bio={user.bio}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default RightSideBar
