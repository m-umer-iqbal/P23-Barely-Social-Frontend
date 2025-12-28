import React, { useState, useEffect, useContext, useCallback } from 'react'
import ToggleTabs from "../Common/ToggleTabs";
import UsersList from "../RightSideBar/UsersList";
import { idContext } from '../../context/context';
import { globalRefreshContext } from "../../context/context"
import Loading from "../Common/Loading";
import SuccessOrWarningMessage from "../Common/SuccessOrWarningMessage";
import SearchBar from "../RightSideBar/SearchBar";

const RightSideBar = (props) => {
    const [alertType, setAlertType] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = useContext(idContext)
    const [active, setActive] = useState("follow");
    const [users, setUsers] = useState([])
    const { globalRefresh } = useContext(globalRefreshContext)
    const [filteredUsers, setFilteredUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

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
                    setFilteredUsers(data.usersList); // Initialize filtered users
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

    // Filter users based on search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredUsers(users);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = users.filter(user =>
            user.fullname?.toLowerCase().includes(query) ||
            user.username?.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    // Add a function to handle tab changes
    const handleTabChange = (newActive) => {
        setActive(newActive);
        setUsers([]); // Clear previous users immediately
        setFilteredUsers([]); // Clear filtered users too
        setSearchQuery(''); // Clear search query
        setLoading(true); // Show loading state
    };

    // Handle search
    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
    }, []);

    return (
        <div className={`${props.activeView === "people" ? "flex lg:flex" : "hidden lg:hidden"} flex-col gap-4 p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl max-h-screen min-h-screen pb-16 min-w-full max-w-full
                        lg:min-w-[57vw] lg:min-h-0
                        2xl:flex 2xl:min-w-[25vw] 2xl:max-w-[25vw] 2xl:p-8`} >
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

            {/* Search Bar */}
            <div className="px-1 sm:px-0">
                <SearchBar
                    onSearch={handleSearch}
                    placeholder={`Search ${active === "follow" ? "strangers" : "following"}...`}
                />
            </div>

            {loading ? (
                <Loading />
            ) : (
                <div className="flex flex-col gap-4 max-h-screen overflow-y-auto [&::-webkit-scrollbar]:w-0 px-1 sm:px-0">
                    {/* No results message */}
                    {filteredUsers.length === 0 && searchQuery && (
                        <div className="text-center py-8 text-dark-blue-600">
                            <p className="text-lg font-medium">No results found for "{searchQuery}"</p>
                            <p className="text-sm mt-2">Try searching with a different name or username</p>
                        </div>
                    )}

                    {/* No users message */}
                    {filteredUsers.length === 0 && !searchQuery && (
                        <div className="text-center py-8 text-dark-blue-600">
                            <p className="text-lg font-medium">
                                {active === "follow" ? "No strangers to show" : "Not following anyone yet"}
                            </p>
                            <p className="text-sm mt-2">
                                {active === "follow"
                                    ? "Start connecting with people!"
                                    : "Follow people to see them here"}
                            </p>
                        </div>
                    )}

                    {/* Users List */}
                    {filteredUsers.map(user => (
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
                </div>
            )}
        </div>
    )
}

export default RightSideBar
