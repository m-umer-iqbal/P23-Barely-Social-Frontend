import React, { useEffect, useState, useContext } from 'react'
import ProfilePicture from "../Common/ProfilePicture"
import { idContext, globalRefreshContext } from '../../context/context';

const UsersList = (props) => {
    const userId = useContext(idContext)
    const { setGlobalRefresh } = useContext(globalRefreshContext)
    const [following, setFollowing] = useState(null);

    useEffect(() => {
        if (props.btnText === "Be Barely Social") {
            setFollowing("following");
        } else {
            setFollowing(null);
        }
    }, [props.btnText]);

    const handleClick = async () => {

        if (following === "following") {
            // REMOVE
            let response = await fetch(`http://localhost:3000/user/follow?userId=${userId}&id=${props.id}&following=remove`, {
                method: "GET",
                credentials: "include"
            });
            let data = await response.json();
            if (data.success) {
                setFollowing(null);
                setGlobalRefresh(prev => !prev)
            }
            return;
        }

        // FOLLOW
        let response = await fetch(`http://localhost:3000/user/follow?userId=${userId}&id=${props.id}&following=follow`, {
            method: "GET",
            credentials: "include"
        });
        let data = await response.json();
        if (data.success) {
            setFollowing("following");
            setGlobalRefresh(prev => !prev)
        }
    };

    return (
        <div className="flex gap-4 border-b-4 pb-3 last:border-b-0">
            <ProfilePicture profilePicture={props.profilePicture} />
            <div className="flex flex-col font-semibold items-start gap-2">
                <p className="text-2xl">{props.fullname || "@" + props.username}</p>
                <p className="">{props.bio}</p>
                <button
                    onClick={handleClick}
                    className={`transition-all duration-300 ease-in-out rounded-4xl py-1.5 px-2 cursor-pointer border-2 border-dark-blue-900 ${following === "following" ? "hover:bg-red-500 hover:border-red-500 hover:text-white" : "hover:bg-dark-blue-900 hover:text-off-blue-200"}`}>
                    {props.btnText}
                </button>
            </div>
        </div>
    )
}

export default UsersList
