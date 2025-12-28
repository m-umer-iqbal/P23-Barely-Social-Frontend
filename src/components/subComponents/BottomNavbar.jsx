import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BottomNavbar = (props) => {
    const navigate = useNavigate();

    return (
        <div
            className="
        fixed bottom-0 left-0 right-0
        bg-dark-blue-900 
        border-t border-off-blue-200
        flex justify-around items-center
        h-14
        lg:h-16
        2xl:hidden
        z-50" >
            {/* Profile */}
            <button
                onClick={() => props.setActiveView("profile")}
                className={`group px-3 py-1 flex flex-col items-center gap-1 text-xs font-semibold  rounded-4xl transition-all duration-300 ease-in-out
                            lg:hidden
                            ${props.activeView === "profile" ? "text-dark-blue-900 bg-off-blue-200" : "text-off-blue-200 hover:text-dark-blue-900 hover:bg-off-blue-200"}`} >
                <img src="/src/assets/profile-icon.svg" alt="Profile" className={`filter transition ${props.activeView === "profile" ? "filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]" : "filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]"}`} />
                <span>Profile</span>
            </button>

            {/* Home */}
            <button
                onClick={() => props.setActiveView("home")}
                className={`group px-3 py-1 flex flex-col items-center gap-1 text-xs font-semibold  rounded-4xl transition-all duration-300 ease-in-out
                            lg:text-sm
                            ${props.activeView === "home" ? "text-dark-blue-900 bg-off-blue-200" : "text-off-blue-200 hover:text-dark-blue-900 hover:bg-off-blue-200"}`} >
                <img src="/src/assets/home-icon.svg" alt="Home" className={`filter transition ${props.activeView === "home" ? "filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]" : "filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]"}`} />
                <span>Home</span>
            </button>

            {/* People */}
            <button
                onClick={() => props.setActiveView("people")}
                className={`group px-3 py-1 flex flex-col items-center gap-1 text-xs font-semibold  rounded-4xl transition-all duration-300 ease-in-out
                            lg:text-sm
                            ${props.activeView === "people" ? "text-dark-blue-900 bg-off-blue-200" : "text-off-blue-200 hover:text-dark-blue-900 hover:bg-off-blue-200"}`} >
                <img src="/src/assets/people-icon.svg" alt="People" className={`filter transition ${props.activeView === "people" ? "filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]" : "filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]"}`} />
                <span>People</span>
            </button>
        </div >
    );
};

export default BottomNavbar;
