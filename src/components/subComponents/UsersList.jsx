import React, { useEffect, useState, useContext } from 'react'
import ProfilePicture from "./ProfilePicture"
import { idContext, globalRefreshContext } from '../../context/context';

const UsersList = (props) => {
    const userId = useContext(idContext)
    const { globalRefresh, setGlobalRefresh } = useContext(globalRefreshContext)
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
            alert(data.message);
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
        alert(data.message);
    };

    return (
        <div className="flex gap-4 border-b-4 pb-3 last:border-b-0">
            <div className="">
                <ProfilePicture />
            </div>
            <div className="flex flex-col font-semibold items-start gap-2">
                <p className="text-2xl">{props.fullname}</p>
                <p className="">{props.bio}</p>
                <button
                    onClick={handleClick}
                    className={`rounded-4xl py-1.5 px-2 cursor-pointer border-2 border-dark-blue-900 ${following === "following" ? "hover:bg-red-500 hover:border-red-500 hover:text-white" : "hover:bg-dark-blue-900 hover:text-off-blue-200"}`}>
                    {props.btnText}
                </button>
            </div>
        </div>
    )
}

export default UsersList
