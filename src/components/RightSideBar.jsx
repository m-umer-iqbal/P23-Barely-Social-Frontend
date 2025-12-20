import React, { useState, useEffect, useContext } from 'react'
import ToggleTabs from "./subComponents/ToggleTabs";
import UsersList from "./subComponents/UsersList";
import { idContext } from '../context/context';
import { globalRefreshContext } from "../context/context"
import Loading from "./Loading";

const RightSideBar = () => {
    const [loading, setLoading] = useState(true);
    const userId = useContext(idContext)
    const [active, setActive] = useState("follow");
    const [users, setUsers] = useState([])
    const { globalRefresh } = useContext(globalRefreshContext)

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
                    setLoading(false)
                } else {
                    alert(data.message);
                    setLoading(false)
                }
            } catch (error) {
                alert("Error in sending request for fetching users.")
                setLoading(false)
            }
        }
        setTimeout(fetchProfiles(), 3000)
    }, [globalRefresh])

    return (
        <div div className="flex flex-col gap-4 min-w-[25vw] max-w-[25vw] p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl max-h-screen" >

            <ToggleTabs
                options={[
                    { label: "Strangers in Judgement", value: "following" },
                    { label: "Strangers to Judge", value: "follow" }
                ]}
                active={active}
                setActive={setActive}
                minWidth={49}
            />

            {loading ? <Loading /> : <div className="flex flex-col gap-4 max-h-screen overflow-y-auto [&::-webkit-scrollbar]:w-0">
                {active === "follow" && users
                    .filter((user) => { return ((user._id !== userId) && (!user.followers.includes(userId))) })
                    .map(user => (
                        <UsersList
                            key={user._id}
                            id={user._id}
                            fullname={user.fullname}
                            username={user.username}
                            bio={user.bio}
                            btnText="Be Social"
                            profilePicture={user.profilePicture}
                        />
                    ))
                }

                {active === "following" && users
                    .filter((user) => { return ((user._id !== userId) && (user.followers.includes(userId))) })
                    .map(user => (
                        <UsersList
                            key={user._id}
                            id={user._id}
                            fullname={user.fullname}
                            username={user.username}
                            bio={user.bio}
                            btnText="Be Barely Social"
                            profilePicture={user.profilePicture}
                        />
                    ))
                }
            </div>}
        </div>
    )
}

export default RightSideBar
