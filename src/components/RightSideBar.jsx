import React, { useState } from 'react'
import ToggleTabs from "./subComponents/ToggleTabs";

const RightSideBar = () => {
    const [active, setActive] = useState("friends");

    return (
        <div className="flex flex-col items-center min-w-[25vw] max-w-[25vw] p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl max-h-screen">

            <ToggleTabs
                options={[
                    { label: "Friends", value: "friends" },
                    { label: "Find Friends", value: "findFriends" }
                ]}
                active={active}
                setActive={setActive}
            />

        </div>
    )
}

export default RightSideBar
